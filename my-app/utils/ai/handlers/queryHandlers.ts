import { bloodKnowledge } from '../bloodKnowledge';
import { EnhancedNlpManager } from '../initializeModel';

type TreatmentStatus = 'high' | 'low' | 'normal';
/**
 * result from analysis
 */
interface AnalysisResult {
  component: string;
  status: TreatmentStatus;
  response: string;
}
/**
 * numerical  value analysis and provides response
 * @param text -input text
 * @param value -numerical value to analyze
 * @param result -nlp analysis 
 * @returns -return component, status, and resposne
 */
export async function handleNumericAnalysis(
  text: string,
  value: string,
  result: any
): Promise<AnalysisResult | null> {
  // get blood components
  const componentMatches = Object.keys(bloodKnowledge).filter(comp => 
    text.toLowerCase().includes(comp.toLowerCase())
  );
  // if nothing found null
  if (componentMatches.length === 0) return null;
  // get first match component and get the response data
  const component = componentMatches[0];
  const componentInfo = bloodKnowledge[component as keyof typeof bloodKnowledge];
  // clean and get the number
  const normalRange = componentInfo.normalRange.replace(/,/g, '');
  const [min, max] = normalRange.split('-').map(Number);
  const numericValue = parseFloat(value);
  // determine status and value based on comparison 
  const status = numericValue > max ? 'high' : numericValue < min ? 'low' : 'normal';
  
  return {
    component,
    status,
    response: `**${component.toUpperCase()} Analysis**\n\n` +
      `Your value: ${numericValue.toLocaleString()} is ${status.toUpperCase()}\n` +
      `Normal range: ${componentInfo.normalRange}\n\n` +
      `${status === 'low' ? componentInfo.lowMeaning : status === 'high' ? componentInfo.highMeaning : componentInfo.normalMeaning}\n\n` +
      `Common causes of ${status} ${component}:\n` +
      componentInfo.causes[status].map(c => `• ${c}`).join('\n') + '\n\n' +
      `Interested in:\n` +
      `• Treatment options\n` +
      `• Dietary recommendations\n` +
      `• Risk factors\n` +
      `• Follow-up testing?`
  };
}
/**
 * treatment related questions handler
 * @param text -input text
 * @param lastAnalyzedComponent - context of conversation  
 * @param lastAnalyzedStatus - context of last component (like high or low)
 * @param manager nlp manager instance in case need processing 
 * @returns - formatted response and recommendation or clarkification 
 */
export async function handleTreatmentQuestion(
  text: string,
  lastAnalyzedComponent: string | null,
  lastAnalyzedStatus: string | null,
  manager: EnhancedNlpManager
): Promise<string | null> {
  // Try to extract component and status from the question first
  const components = Object.keys(bloodKnowledge);
  let component = lastAnalyzedComponent;
  let status = lastAnalyzedStatus;

  // Check for component in text
  for (const comp of components) {
    if (text.toLowerCase().includes(comp.toLowerCase())) {
      component = comp;
      break;
    }
  }

  // Check for status in text
  // this overrides context if found something else in question
  if (text.toLowerCase().includes('low')) {
    status = 'low';
  } else if (text.toLowerCase().includes('high')) {
    status = 'high';
  }

  if (!component || !status) {
    return "Could you specify which blood component you'd like treatment recommendations for? For example: 'How to treat low hemoglobin?'";
  }

  const componentInfo = bloodKnowledge[component as keyof typeof bloodKnowledge];
  const treatments = componentInfo.treatment[status as TreatmentStatus];

  if (!treatments || treatments.length === 0) {
    return "I don't have specific treatment recommendations for this condition.";
  }

  return `Here are treatment recommendations for ${status} ${component}:\n\n${treatments.map(t => `• ${t}`).join('\n')}`;
}