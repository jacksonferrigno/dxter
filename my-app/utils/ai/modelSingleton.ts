/**
 * Single pattern implementation for the model
 * it ensures that only one instance of the model exists throughout
 * the app
 * includes:
 *    lazy initialization of model
 *    serverless capcability (needed this bc it did not work on vercel otherwise)
 */
import { EnhancedNlpManager } from './initializeModel';
import { initializeModel } from './initializeModel';
// single instance of the model
let modelInstance: EnhancedNlpManager | null = null;
/**
 * gets or intializes the model
 * @example
 * const model = await getModel();
 * const result = await model.process('en', 'what is hemoglobin?');
 */
export async function getModel(): Promise<EnhancedNlpManager> {
  if (!modelInstance) {
    console.log('Initializing new NLP model instance...');
    const manager = new EnhancedNlpManager({ 
      languages: ['en'],
      autoSave: false, // required for vercel
      modelFileName: undefined // no file operations
    });
    modelInstance = await initializeModel();
    console.log('NLP model initialized successfully');
  }
  return modelInstance;
}
//**https://www.torrencecole.com/writings/singleton */