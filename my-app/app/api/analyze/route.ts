import { NextResponse } from 'next/server';
import { initializeModel, EnhancedNlpManager } from '@/utils/ai/initializeModel';
import { connectToDatabase } from '@/utils/ai/db/mongodb';
import { ChatHistory } from '@/utils/ai/models/chatHistory';
import { handleNumericAnalysis,handleTreatmentQuestion } from '@/utils/ai/handlers/queryHandlers';

let lastAnalyzedComponent: string | null = null;
let lastAnalyzedStatus: string | null = null;
/**
 * Process queires about blood test results 
 * @param req -Request obj which has the text in the body
 * @returns NextResponse with: intent, confidence, processing time and if appilcable error
 */
export async function POST(req: Request) {
  const startTime = Date.now();

  try {
// connect to mongodb for storing chat info
    await connectToDatabase();
    const { text } = await req.json();
    // make sure we get an input 
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
 // set up model and process text 
    const manager = await initializeModel() as EnhancedNlpManager;
    if (!manager) return NextResponse.json({ error: 'NLP model unavailable' }, { status: 500 });

    const result = await manager.process('en', text);
    const normalizedText = text.toLowerCase().trim();

// easter egg because its fun and i just watch the minions movie :)
    if (/banana.*monkey|monkey.*banana/.test(normalizedText)) {
      const bananaFacts = [
        "🍌 Did you know? Bananas are berries, but strawberries aren't!",
        "🐒 Monkeys actually prefer figs over bananas in the wild!",
        "🍌 A banana contains 96% of the radioactive potassium you need daily!",
        "🐒 Monkeys can peel bananas from the bottom, just like pros!"
      ];
      
      return NextResponse.json({
        response: `
        🍌 🐒 BANANA MONKEY MODE ACTIVATED! 🐒 🍌
        
        ${bananaFacts[Math.floor(Math.random() * bananaFacts.length)]}
        
        But since this is a blood test assistant, here's a fun fact:
        Potassium from bananas helps regulate blood pressure and supports proper heart function! 
        
        🍌 🐒 OOOK OOOK! 🐒 🍌
        `,
        easterEgg: true,
        bananaMode: true,
        processingTime: Date.now() - startTime,
        special: "monke"
      });
    }

   // if numbers are in there, get them 
    const numbers = text.match(/\d+(\.\d+)?/g);
    if (numbers) {
      const analysisResult = await handleNumericAnalysis(text, numbers[0], result);
      if (analysisResult) {
        lastAnalyzedComponent = analysisResult.component;
        lastAnalyzedStatus = analysisResult.status;
        result.answer = analysisResult.response;
        result.intent = `${analysisResult.component}.analyze`;
        result.classifications = [{
          intent: `${analysisResult.component}.analyze`,
          score: result.score  // High confidence for numeric analysis
        }];
      }
    }
    if (/^(hi|hey|hello|greetings)/i.test(normalizedText)) {
      return NextResponse.json({
        response: `Hey there! 👋 I can help you understand your blood test results and provide general treatment suggestions. What would you like to know?`,
        processingTime: Date.now() - startTime,
      });
    }
    if (/^(thanks|thank you|bye|goodbye)/i.test(normalizedText)) {
      return NextResponse.json({
        response: `You're welcome! Stay healthy! 🌟`,
        processingTime: Date.now() - startTime,
      });
    }

    // Handle treatment questions
    if (/how.*treat|treatment/i.test(normalizedText)) {
      const treatmentResult = await handleTreatmentQuestion(
        text,
        lastAnalyzedComponent,
        lastAnalyzedStatus,
        manager
      );
      if (treatmentResult) {
        result.answer = treatmentResult;
        result.intent = `${lastAnalyzedComponent}.treatment.${lastAnalyzedStatus}`;
        result.classifications = [{
          intent: `${lastAnalyzedComponent}.treatment.${lastAnalyzedStatus}`,
          score: result.score
        }];
      }
    }

    // Store successful interaction to db
    if (result.answer) {
      await ChatHistory.create({
        query: text,
        response: result.answer,
        intent: result.classifications?.[0]?.intent || 'unknown',
        confidence: result.classifications?.[0]?.score || 0,
        component: result.entities?.[0]?.entity || null,
        questionType: result.intent || 'general',
      });
    }
// retrun final answewr
    return NextResponse.json({
      response: result.answer || "I'm not sure how to respond to that question.",
      confidence: result.classifications?.[0]?.score || 0,
      processingTime: Date.now() - startTime,
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process text', details: error?.message },
      { status: 500 },
    );
  }
}