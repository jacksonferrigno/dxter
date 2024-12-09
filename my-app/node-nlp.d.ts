declare module 'node-nlp' {
  // main NLP manager for handling lang processing
    export class NlpManager {
      constructor(settings: any);
      // entry name with variations
      addNamedEntityText(type: string, name: string, languages: string[], values: string[]): void;
     // pattern for matching spec formats
      addRegexEntity(name: string, language: string, regex: RegExp): void;
      // training examples
      addDocument(language: string, pattern: string, intent: string): void;
      // map intent to resposne
      addAnswer(language: string, intent: string, answer: string): void;
      // use training data to build model
      train(): Promise<void>;
      // analyze the input and return the right response
      process(language: string, text: string, context?: any): Promise<any>;
      // sentiment (positive/negative/neutral etc) of input
      getSentiment(language: string, text: string): Promise<any>;
      // save the model to a file
      save(filename: string): Promise<void>;
      // get the model
      load(filename: string): Promise<void>;
    }
    // for storing convo state and context between interactions (*this is important for later)
    export interface ConversationContext {
      [key: string]: any;
    }
  }