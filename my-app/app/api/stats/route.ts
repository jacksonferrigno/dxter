import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/ai/db/mongodb';
import { ChatHistory } from '@/utils/ai/models/chatHistory';
/**
 * GET handler for retriving chat analytics and stats
 * @see chatHistory.ts for schema
 * @returns -json response
 */
export async function GET() {
  try {
    await connectToDatabase();

    // Get total num of chat interaction 
    const totalInteractions = await ChatHistory.countDocuments();

    // get the avg confidence score 
    const confidenceStats = await ChatHistory.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: "$confidence" }
        }
      }
    ]);


    return NextResponse.json({
      overview: {
        totalInteractions,
        avgConfidence: confidenceStats[0]?.avgConfidence || 0
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/#mongodb-expression-exp.-avg