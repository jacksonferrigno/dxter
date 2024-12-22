import { ConversationContext } from "node-nlp";
import { bloodKnowledge, BloodComponent } from "./bloodKnowledge";

export const questionTrainingExamples = [
    // Hemoglobin-related (expanded)
    { text: "what does high hemoglobin mean", intent: "hemoglobin.high" },
    { text: "what does elevated hemoglobin mean", intent: "hemoglobin.high" },
    { text: "is my hemoglobin too high", intent: "hemoglobin.high" },
    { text: "my hemoglobin levels are elevated", intent: "hemoglobin.high" },
    { text: "doctor says my hemoglobin is high", intent: "hemoglobin.high" },
    { text: "what does low hemoglobin mean", intent: "hemoglobin.low" },
    { text: "what causes low hemoglobin", intent: "hemoglobin.low" },
    { text: "why is my hemoglobin low", intent: "hemoglobin.low" },
    { text: "what does it mean to have low hemoglobin", intent: "hemoglobin.low" },
    { text: "my hemoglobin is below normal", intent: "hemoglobin.low" },
    { text: "doctor mentioned low hemoglobin", intent: "hemoglobin.low" },

    // Platelet-related (expanded)
    { text: "what does low platelets mean", intent: "platelets.low" },
    { text: "why are my platelets low", intent: "platelets.low" },
    { text: "what causes low platelets", intent: "platelets.low" },
    { text: "my platelet count is below normal", intent: "platelets.low" },
    { text: "doctor says I have thrombocytopenia", intent: "platelets.low" },
    { text: "what does high platelets mean", intent: "platelets.high" },
    { text: "why are my platelets elevated", intent: "platelets.high" },
    { text: "what causes high platelets", intent: "platelets.high" },
    { text: "my platelet count is above normal", intent: "platelets.high" },
    { text: "doctor mentioned thrombocytosis", intent: "platelets.high" },

    // WBC-related (expanded)
    { text: "what does high white blood cell count mean", intent: "wbc.high" },
    { text: "what causes elevated WBC", intent: "wbc.high" },
    { text: "why are my white blood cells high", intent: "wbc.high" },
    { text: "doctor says I have leukocytosis", intent: "wbc.high" },
    { text: "my WBC count is above normal", intent: "wbc.high" },
    { text: "what does low white blood cell count mean", intent: "wbc.low" },
    { text: "what causes low WBC", intent: "wbc.low" },
    { text: "why are my white blood cells low", intent: "wbc.low" },
    { text: "doctor mentioned leukopenia", intent: "wbc.low" },
    { text: "my WBC count is below normal", intent: "wbc.low" },

    // Treatment-related questions
    { text: "how can I increase my hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "what helps with low platelets", intent: "platelets.treatment.low" },
    { text: "how to reduce high WBC", intent: "wbc.treatment.high" },
    { text: "what helps with low platelets", intent: "platelets.treatment.low" },
    { text: "supplements for low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "treatment for low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "how to treat low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "what is the treatment for low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "treatments for low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "what treatments are available for low hemoglobin", intent: "hemoglobin.treatment.low" },
    { text: "what should I do about low hemoglobin", intent: "hemoglobin.treatment.low" },
    
    // Diet-related questions (new)
    { text: "what should I eat for low iron", intent: "hemoglobin.treatment.low" },
    { text: "diet for high white blood cells", intent: "wbc.treatment.high" },
    { text: "foods to avoid with high platelets", intent: "platelets.treatment.high" },
    { text: "what foods increase hemoglobin", intent: "hemoglobin.treatment.low" },
    


    // Hematocrit-related
    { text: "what does high hematocrit mean", intent: "hematocrit.high" },
    { text: "is my hematocrit too high", intent: "hematocrit.high" },
    { text: "what does low hematocrit mean", intent: "hematocrit.low" },
    { text: "why is my hematocrit low", intent: "hematocrit.low" },
    { text: "what causes low hematocrit", intent: "hematocrit.low" },

    // MCV (Mean Corpuscular Volume)-related
    { text: "what does high MCV mean", intent: "mcv.high" },
    { text: "what does elevated MCV indicate", intent: "mcv.high" },
    { text: "is my MCV too high", intent: "mcv.high" },
    { text: "what does low MCV mean", intent: "mcv.low" },
    { text: "what causes low MCV", intent: "mcv.low" },
    { text: "why is my MCV low", intent: "mcv.low" },

    // MCH (Mean Corpuscular Hemoglobin)-related
    { text: "what does high MCH mean", intent: "mch.high" },
    { text: "why is my MCH high", intent: "mch.high" },
    { text: "what does low MCH mean", intent: "mch.low" },
    { text: "what causes low MCH", intent: "mch.low" },
    
    // General blood questions
    { text: "what is a normal blood count", intent: "blood.normal" },
    { text: "what are normal blood values", intent: "blood.normal" },
    { text: "what should my blood levels be", intent: "blood.normal" },
    { text: "are my blood results normal", intent: "blood.normal" },

    // Add numerical range questions
    { text: "is 16 g/dL hemoglobin too high", intent: "hemoglobin.analyze" },
    { text: "my hemoglobin is 17, is that high", intent: "hemoglobin.analyze" },
    { text: "hemoglobin dropped to 9", intent: "hemoglobin.analyze" },
    { text: "wbc count is 12000", intent: "wbc.analyze" },
    { text: "platelets at 450", intent: "platelets.analyze" },
    
    // Add contextual reference questions
    { text: "what does that number mean", intent: "blood.context" },
    { text: "is it dangerous at this level", intent: "blood.context" },
    { text: "should I be worried about these results", intent: "blood.context" },
    { text: "what could be causing it", intent: "blood.context" },
    
    // Add range questions
    { text: "what's the normal range for hemoglobin", intent: "hemoglobin.range" },
    { text: "what should my platelets be", intent: "platelets.range" },
    { text: "normal wbc range", intent: "wbc.range" },
];

export const trainingPatterns = {
  treatment: [
    'how do I treat it',
    'how to treat it',
    'what is the treatment',
    'treatment options',
    'how can I treat this',
    'what should I do about {status} {component}',
    'my {component} is {status} what should I do',
    'my {component} count is {status}',
    'my blood test shows {status} {component}',
    'help my {component} is too {status}',
    'treatment for {status} {component}',
    'treatments for {status} {component}',
    '{status} {component} treatment',
    '{status} {component} treatments',
    'how to treat {status} {component}',
    'ways to treat {status} {component}'
  ],
  
  numericalFormat: [
    '%d level',
    'count of %d',
    'shows %d',
    'at %d',
    'result is %d',
    'is %d normal',
    'is %d too high',
    'is %d too low',
    'about %d'
  ],

  numerical: [
    '{component} is {value}',
    '{component} shows {value}',
    'my {component} reading is {value}',
    '{component} test shows {value}',
    '{value} for {component}',
    '{component} result of {value}'
  ],

  followUp: [
    'how do I keep my {component} normal',
    'maintain {component} levels',
    'keep {component} stable',
    'prevent {component} changes',
    'how to increase {component}',
    'ways to raise {component}',
    'how to lower {component}',
    'reduce my {component}',
    'how long to improve {component}',
    'how quickly can I change {component}',
    'how long until {component} improves',
    'when will my {component} normalize',
    '{component} improvement timeline'
  ],

  state: {
    basic: [
      'what is {component}',
      'what does {component} mean',
      'explain {component}',
      'tell me about {component}'
    ],
    low: [
      'what is low {component}',
      'what does low {component} mean',
      'explain low {component}',
      'what happens with low {component}',
      'what causes low {component}',
      'why is my {component} low'
    ],
    high: [
      'what is high {component}',
      'what does high {component} mean',
      'explain high {component}',
      'what happens with high {component}',
      'what causes high {component}',
      'why is my {component} high'
    ]
  },

  // Add new patterns for ranges
  ranges: [
    'what is normal {component}',
    'normal range for {component}',
    'what should {component} be',
    'healthy {component} levels',
    'normal levels of {component}',
    '{component} reference range'
  ],
  
  // Add patterns for contextual references
  contextual: [
    'what does that mean',
    'is it serious',
    'should I worry about it',
    'what causes that',
    'is that dangerous',
    'what does this mean',
    'why would that happen',
    'what can cause this'
  ],
};

export const responseTemplates = {
  basic: (component: BloodComponent) => {
    const info = bloodKnowledge[component];
    return `**${component.toUpperCase()}**\n\n` +
      `${info.description}\n\n` +
      `📊 Normal Range: ${info.normalRange}\n` +
      `Function: ${info.function}\n` +
      `Key Points:\n` +
      `• Low: ${info.lowMeaning}\n` +
      `• High: ${info.highMeaning}\n\n` +
      `Want to know more about:\n` +
      `• Normal ranges\n` +
      `• Symptoms\n` +
      `• Treatments?`;
  },

  low: (component: BloodComponent) => {
    const info = bloodKnowledge[component];
    return `**Low ${component.toUpperCase()}**\n\n` +
      `${info.lowMeaning}\n` +
      `📊 Normal Range: ${info.normalRange}\n` +
      `Common Symptoms:\n` +
      info.symptoms.low.map(s => `• ${s}`).join('\n') + '\n' +
      `Common Causes:\n` +
      info.causes.low.map(c => `• ${c}`).join('\n') + '\n' +
      `More about:\n` +
      `• Improvement strategies\n` +
      `• Prevention\n` +
      `• Follow-up?`;
  },

  high: (component: BloodComponent) => {
    const info = bloodKnowledge[component];
    return `**High ${component.toUpperCase()}**\n\n` +
      `${info.highMeaning}\n` +
      `📊 Normal Range: ${info.normalRange}\n` +
      `Common Symptoms:\n` +
      info.symptoms.high.map(s => `• ${s}`).join('\n') + '\n' +
      `Common Causes:\n` +
      info.causes.high.map(c => `• ${c}`).join('\n') + '\n' +
      `More about:\n` +
      `• Improvement strategies\n` +
      `• Prevention\n` +
      `• Follow-up?`;
  },

  followUp: {
    normal: (component: BloodComponent) => {
      const info = bloodKnowledge[component];
      return `To maintain healthy ${component} levels:\n` +
        `🥗 Diet:\n${info.maintenance.diet.map(d => `• ${d}`).join('\n')}\n` +
        `💪 Lifestyle:\n${info.maintenance.lifestyle.map(l => `• ${l}`).join('\n')}\n` +
        `⏱️ Monitoring:\n${info.maintenance.monitoring.map(m => `• ${m}`).join('\n')}`;
    },
    high: (component: BloodComponent) => {
      const info = bloodKnowledge[component];
      return `To lower your ${component} levels:\n` +
        `🎯 Actions:\n${info.improvement.decrease.map(a => `• ${a}`).join('\n')}\n` +
        `⏱️ Timeline: ${info.improvement.timeline}\n` +
        `Regular monitoring is recommended.`;
    },
    low: (component: BloodComponent) => {
      const info = bloodKnowledge[component];
      return `To raise your ${component} levels:\n` +
        `🎯 Actions:\n${info.improvement.increase.map(a => `• ${a}`).join('\n')}\n` +
        `⏱️ Timeline: ${info.improvement.timeline}\n` +
        `Regular monitoring is recommended.`;
    }
  },

  range: (component: BloodComponent) => {
    const info = bloodKnowledge[component];
    return `**Normal Range for ${component.toUpperCase()}**\n\n` +
      `The normal range is ${info.normalRange}\n\n` +
      `• Below ${info.normalRange.split('-')[0]}: Considered low\n` +
      `• Above ${info.normalRange.split('-')[1]}: Considered high\n\n` +
      `Would you like to know more about:\n` +
      `• What affects these levels?\n` +
      `• How to maintain normal levels?\n` +
      `• When to be concerned?`;
  },

  context: (context: ConversationContext) => {
    // This template would use the conversation context to provide relevant responses
    // for follow-up questions using pronouns (it, that, this)
    const info = bloodKnowledge[context.component as BloodComponent];
    return `Based on your ${context.component} being ${context.status}, ` +
      `this means: ${context.status === 'high' ? info.highMeaning : info.lowMeaning}\n\n` +
      `Would you like to know more about:\n` +
      `• Treatment options\n` +
      `• Possible causes\n` +
      `• Next steps?`;
  }
};
