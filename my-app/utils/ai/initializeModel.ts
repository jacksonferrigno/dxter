import { NlpManager } from 'node-nlp';
import { questionTrainingExamples, trainingPatterns, responseTemplates } from './testData';
import { bloodKnowledge, BloodComponent } from './bloodKnowledge';
/**
 * represents contenxt of convo with the model
 */
export interface ConversationContext {
  component: string; // blood component
  value?: number; // numerical value if avaliable
  status?: 'high' | 'low' | 'normal'; // status
  lastIntent?: string; // last intent from prev chat 
  lastQuestion?: string; // last question asked
}
/**
 * manage convo state and context from prev sessions
 */
export class ConversationManager {
  private static conversations = new Map<string, ConversationContext>();
/**
 * function to update context for given session 
 * @param sessionId - identifer for convo
 * @param context - use partial context in event to merge with exisiting 
 */
  static updateContext(sessionId: string, context: Partial<ConversationContext>) {
    const existing = this.conversations.get(sessionId) || { component: '' };
    this.conversations.set(sessionId, { ...existing, ...context });
  }
/**
 * Gets the context 
 * @param sessionId - identifer for convo
 * @returns context of convo
 */
  static getContext(sessionId: string): ConversationContext | undefined {
    return this.conversations.get(sessionId);
  }
/**
 * resets convo context
 * @param sessionId - identifer for convo
 */
  static clearContext(sessionId: string) {
    this.conversations.delete(sessionId);
  }
}
/**
 * Enhanced NLP manager with extended capabilities 
 */
export class EnhancedNlpManager extends NlpManager {
  // map of custom handlers for intents
  private analysisHandlers = new Map<string, (result: any) => any>();
  private lastTrainingTime: number = 0;
  private readonly TRAINING_INTERVAL = 1000 * 60 * 60; // 1 hour in milliseconds
/**
 * creates an instance of the class
 * @param settings - config settings for the manager 
 */
  constructor(settings: any) {
    console.log('Current NODE_ENV:', process.env.NODE_ENV);
    super({ 
      ...settings,
      autoSave: process.env.NODE_ENV !== 'production',
      modelFileName: './model.nlp'
    });
    this.lastTrainingTime = Date.now();
  }
/**
 * custom handler for specific intent 
 * @param intent - intent name 
 * @param handler - call back func that processes result
 * @example
 *  manager.addAnalysisHandler('hemoglobin.analyze',(result => {
 *  // logic 
 * return modifiedResult;}));
 */
  addAnalysisHandler(intent: string, handler: (result: any) => any) {
    this.analysisHandlers.set(intent, handler);
  }

  public addRandomVariations(text: string): string[] {
    const variations = [text];
    
    // Add medical context variations
    const medicalContexts = [
      'my doctor said',
      'blood test shows',
      'lab results indicate',
      'test results show'
    ];
    variations.push(...medicalContexts.map(context => `${context} ${text}`));
    
    return variations;
  }

/**
 * process an utterance and apply any custom handlers
 * @param locale - language (english)
 * @param utterance - input to be processed 
 * @param context - if applicable process context obj 
 * @returns NLP result
 * @example
 * const result = await manager.process('en','hemoglobin is 12.5')
 */
  async process(locale: string, utterance: string, context?: any) {
    // Check if retraining is needed
    if (process.env.NODE_ENV === 'development' && 
        (Date.now() - this.lastTrainingTime) > this.TRAINING_INTERVAL) {
      console.log('Retraining model due to time interval...');
      await this.train();
      this.lastTrainingTime = Date.now();
      await this.save();
    }

    const result = await super.process(locale, utterance, context);
    
    if (result.intent && this.analysisHandlers.has(result.intent)) {
      const handler = this.analysisHandlers.get(result.intent);
      return handler!(result);
    }
    
    return result;
  }

  async save() {
    if (process.env.NODE_ENV === 'production') {
      console.log('Skipping save in production environment');
      return; // Correct - we don't want to save in production
    }
    return super.save('./model.nlp');
  }
  
  async load() {
    try {
      if (process.env.NODE_ENV === 'production') {
        // In production, we should still load the model, just not save it
        console.log('Loading model in production...');
        return super.load('./model.nlp');
      }
      return super.load('./model.nlp');
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }}
}
/**
 * initialize and train the nlp model for the blood analysis
 * handles training data, patterns and custom logic
 */
export async function initializeModel() {
  const manager = new EnhancedNlpManager({ languages: ['en'] });

  try {
    // Try to load existing model
    await manager.load();
    console.log('Loaded existing model');

    // In development, add new training examples with variations
    if (process.env.NODE_ENV === 'development') {
      console.log('Adding new training examples...');

      // Add base training examples with variations
      questionTrainingExamples.forEach(example => {
        const variations = manager.addRandomVariations(example.text);
        variations.forEach(variation => {
          manager.addDocument('en', variation, example.intent);
        });
      });

      // Dynamic training for each component
      Object.entries(bloodKnowledge).forEach(([component, info]) => {
        // Add follow-up patterns
        trainingPatterns.followUp.forEach(pattern => {
          const filledPattern = pattern.replace('{component}', component);
          if (pattern.includes('increase') || pattern.includes('raise')) {
            manager.addDocument('en', filledPattern, `${component}.followup.low`);
          } else if (pattern.includes('lower') || pattern.includes('reduce')) {
            manager.addDocument('en', filledPattern, `${component}.followup.high`);
          } else {
            manager.addDocument('en', filledPattern, `${component}.followup`);
          }
        });

        // Add state patterns
        Object.entries(trainingPatterns.state).forEach(([state, patterns]) => {
          patterns.forEach(pattern => {
            const filledPattern = pattern.replace('{component}', component);
            manager.addDocument('en', filledPattern, state === 'basic' ? component : `${component}.${state}`);
          });
        });

        // Add responses
        manager.addAnswer('en', component as BloodComponent, responseTemplates.basic(component as BloodComponent));
        manager.addAnswer('en', `${component}.low`, responseTemplates.low(component as BloodComponent));
        manager.addAnswer('en', `${component}.high`, responseTemplates.high(component as BloodComponent));
        manager.addAnswer('en', `${component}.followup`, responseTemplates.followUp.normal(component as BloodComponent));
        manager.addAnswer('en', `${component}.followup.high`, responseTemplates.followUp.high(component as BloodComponent));
        manager.addAnswer('en', `${component}.followup.low`, responseTemplates.followUp.low(component as BloodComponent));

        // Add treatment patterns
        trainingPatterns.treatment.forEach(pattern => {
          ['high', 'low'].forEach(status => {
            const filledPattern = pattern
              .replace('{component}', component)
              .replace('{status}', status);
            manager.addDocument('en', filledPattern, `${component}.treatment.${status}`);
          });
        });
      });

      // Add range patterns
      Object.entries(bloodKnowledge).forEach(([component, info]) => {
        trainingPatterns.ranges.forEach(pattern => {
          const filledPattern = pattern.replace('{component}', component);
          manager.addDocument('en', filledPattern, `${component}.range`);
        });
        
        // Add range response
        manager.addAnswer('en', `${component}.range`, responseTemplates.range(component as BloodComponent));
      });

      // Add contextual patterns
      trainingPatterns.contextual.forEach(pattern => {
        manager.addDocument('en', pattern, 'blood.context');
      });

      // Add context handler
      manager.addAnalysisHandler('blood.context', (result: any) => {
        const context = ConversationManager.getContext(result.sessionId);
        if (context) {
          return {
            ...result,
            answer: responseTemplates.context(context)
          };
        }
        return result;
      });

      // Train the model with the new data
      await manager.train();
      await manager.save(); // Save the updated model
      console.log('Model trained and saved with new examples');
    }

    return manager;
  } catch (e) {
    console.log('Training new model...');
    
    // If the model doesn't exist, train it from scratch
    questionTrainingExamples.forEach(example => {
      const variations = manager.addRandomVariations(example.text);
      variations.forEach(variation => {
        manager.addDocument('en', variation, example.intent);
      });
    });

    // Dynamic training for each component
    Object.entries(bloodKnowledge).forEach(([component, info]) => {
      // Add follow-up patterns
      trainingPatterns.followUp.forEach(pattern => {
        const filledPattern = pattern.replace('{component}', component);
        if (pattern.includes('increase') || pattern.includes('raise')) {
          manager.addDocument('en', filledPattern, `${component}.followup.low`);
        } else if (pattern.includes('lower') || pattern.includes('reduce')) {
          manager.addDocument('en', filledPattern, `${component}.followup.high`);
        } else {
          manager.addDocument('en', filledPattern, `${component}.followup`);
        }
      });

      // Add state patterns
      Object.entries(trainingPatterns.state).forEach(([state, patterns]) => {
        patterns.forEach(pattern => {
          const filledPattern = pattern.replace('{component}', component);
          manager.addDocument('en', filledPattern, state === 'basic' ? component : `${component}.${state}`);
        });
      });

      // Add responses
      manager.addAnswer('en', component as BloodComponent, responseTemplates.basic(component as BloodComponent));
      manager.addAnswer('en', `${component}.low`, responseTemplates.low(component as BloodComponent));
      manager.addAnswer('en', `${component}.high`, responseTemplates.high(component as BloodComponent));
      manager.addAnswer('en', `${component}.followup`, responseTemplates.followUp.normal(component as BloodComponent));
      manager.addAnswer('en', `${component}.followup.high`, responseTemplates.followUp.high(component as BloodComponent));
      manager.addAnswer('en', `${component}.followup.low`, responseTemplates.followUp.low(component as BloodComponent));

      // Add treatment patterns
      trainingPatterns.treatment.forEach(pattern => {
        ['high', 'low'].forEach(status => {
          const filledPattern = pattern
            .replace('{component}', component)
            .replace('{status}', status);
          manager.addDocument('en', filledPattern, `${component}.treatment.${status}`);
        });
      });
    });

    // Add range patterns
    Object.entries(bloodKnowledge).forEach(([component, info]) => {
      trainingPatterns.ranges.forEach(pattern => {
        const filledPattern = pattern.replace('{component}', component);
        manager.addDocument('en', filledPattern, `${component}.range`);
      });
      
      // Add range response
      manager.addAnswer('en', `${component}.range`, responseTemplates.range(component as BloodComponent));
    });

    // Add contextual patterns
    trainingPatterns.contextual.forEach(pattern => {
      manager.addDocument('en', pattern, 'blood.context');
    });

    // Add context handler
    manager.addAnalysisHandler('blood.context', (result: any) => {
      const context = ConversationManager.getContext(result.sessionId);
      if (context) {
        return {
          ...result,
          answer: responseTemplates.context(context)
        };
      }
      return result;
    });

    await manager.train();
    await manager.save();
    console.log('Model trained and saved');
    return manager;
  }
}

export { getModel } from './modelSingleton';
/**
 * https://www.npmjs.com/package/node-nlp
 * https://github.com/axa-group/nlp.js/tree/master/docs/v4/core
 * https://www.pluralsight.com/resources/blog/software-development/extending-classes-and-interfaces-using-typescript
 * https://medium.com/@ramprasadhnatarajan/basic-chatbotserver-using-node-js-express-and-node-nlp-library-70908573a6ba (did not use src file structure but used infromation for node-nlp)
 * https://medium.com/@shruti.bhargava30/important-chatbot-terms-utterance-intent-entity-and-nlp-27c49a7babd9
 * 
 */
