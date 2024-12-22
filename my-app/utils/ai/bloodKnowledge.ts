export type BloodComponent = 'hemoglobin' | 'wbc' | 'platelets' | 'hematocrit' | 'mcv' | 'mch';


export interface BloodComponentInfo {
  description: string;
  normalRange: string;
  lowMeaning: string;
  highMeaning: string;
  normalMeaning: string;
  function: string;
  symptoms: {
    low: string[];
    high: string[];
    normal: string[];
  };
  causes: {
    low: string[];
    high: string[];
    normal: string[];
  };
  treatment: {
    low: string[];
    high: string[];
    normal: string[];
  };
  maintenance: {
    diet: string[];
    lifestyle: string[];
    monitoring: string[];
  };
  improvement: {
    increase: string[];
    decrease: string[];
    timeline: string;
  };
}


  
  // Enhanced knowledge base
  export const bloodKnowledge: Record<BloodComponent, BloodComponentInfo> = {
    wbc: {
      description: "White Blood Cells (WBCs) are crucial components of your immune system that help fight infections and diseases.",
      normalRange: "4000-11000 cells/mcL",
      lowMeaning: "Low WBC (leukopenia) indicates a weakened immune system, making you more susceptible to infections.",
      highMeaning: "High WBC (leukocytosis) often indicates your body is fighting an infection or inflammation.",
      normalMeaning: "Your WBC count is within healthy range.",
      function: "They protect your body by attacking bacteria, viruses, and other harmful substances.",
      symptoms: {
        low: [
          "Frequent infections",
          "Fever",
          "Fatigue",
          "Slow wound healing",
          "Recurring infections"
        ],
        high: [
          "Fever",
          "Body aches",
          "Night sweats",
          "Unexplained weight loss",
          "Infection symptoms"
        ],
        normal: []
      },
      causes: {
        low: [
          "Bone marrow problems",
          "Autoimmune conditions",
          "Cancer treatments",
          "Severe infections",
          "Certain medications"
        ],
        high: [
          "Bacterial infections",
          "Inflammation",
          "Leukemia",
          "Stress response",
          "Certain medications"
        ],
        normal: []
      },
      treatment: {
        low: [
          "Treating underlying conditions",
          "Growth factor medications",
          "Antibiotic prophylaxis",
          "Lifestyle modifications",
          "Regular monitoring"
        ],
        high: [
          "Treating underlying infection",
          "Anti-inflammatory medications",
          "Lifestyle changes",
          "Regular monitoring",
          "Stress management"
        ],
        normal: []
      },
      maintenance: {
        diet: [
          "Antioxidant-rich foods",
          "Zinc-rich foods (nuts, seeds)",
          "Protein-rich foods",
          "Vitamin C rich foods",
          "Probiotic-rich foods"
        ],
        lifestyle: [
          "Regular moderate exercise",
          "Good sleep hygiene",
          "Stress reduction techniques",
          "Good hand hygiene",
          "Avoid exposure to pollutants"
        ],
        monitoring: [
          "Regular blood tests",
          "Track any infections",
          "Monitor body temperature",
          "Note unusual fatigue",
          "Regular health check-ups"
        ]
      },
      improvement: {
        increase: [
          "Follow prescribed medications",
          "Adequate protein intake",
          "Rest and recovery",
          "Stress management",
          "Regular gentle exercise"
        ],
        decrease: [
          "Follow prescribed medications",
          "Avoid triggers if known",
          "Rest when needed",
          "Maintain good hygiene",
          "Manage underlying conditions"
        ],
        timeline: "Changes can be seen within 1-2 weeks with proper treatment"
      }
    },
    hemoglobin: {
      description: "Hemoglobin is a protein in red blood cells that carries oxygen throughout your body. It's crucial for delivering oxygen from your lungs to all your tissues and organs.",
      normalRange: "12-17 g/dL",
      lowMeaning: "Low hemoglobin (anemia) indicates reduced oxygen-carrying capacity, leading to fatigue and shortness of breath.",
      highMeaning: "High hemoglobin may indicate dehydration, lung disease, or a blood disorder, often leading to thicker blood and potential clotting issues.",
      normalMeaning: "Your hemoglobin level is within healthy range.",
      function: "Transports oxygen from the lungs to the body's tissues.",
      symptoms: {
        low: [
          "Fatigue",
          "Shortness of breath",
          "Pale skin",
          "Weakness",
          "Dizziness"
        ],
        high: [
          "Headache",
          "Dizziness",
          "Flushed skin",
          "Vision disturbances",
          "High blood pressure"
        ],
        normal: []
      },
      causes: {
        low: [
          "Iron deficiency",
          "Vitamin B12 deficiency",
          "Chronic illness",
          "Bone marrow disorders",
          "Blood loss"
        ],
        high: [
          "Dehydration",
          "Smoking",
          "High altitude adaptation",
          "Lung disease",
          "Polycythemia vera"
        ],
        normal: []
      },
      treatment: {
        low: [
          "Iron supplements",
          "Vitamin B12 or folate supplements",
          "Dietary adjustments",
          "Blood transfusions",
          "Treatment of underlying conditions"
        ],
        high: [
          "Hydration",
          "Phlebotomy (blood removal)",
          "Oxygen therapy",
          "Medication",
          "Treatment of underlying conditions"
        ],
        normal: []
      },
      maintenance: {
        diet: [
          "Iron-rich foods (red meat, spinach, beans)",
          "Vitamin C rich foods to enhance iron absorption",
          "Vitamin B12 rich foods (eggs, dairy, meat)",
          "Folate-rich foods (leafy greens, citrus)",
          "Avoid foods that inhibit iron absorption (coffee, tea)"
        ],
        lifestyle: [
          "Regular moderate exercise",
          "Adequate sleep (7-9 hours)",
          "Stress management",
          "Avoid smoking",
          "Limit alcohol consumption"
        ],
        monitoring: [
          "Regular blood tests every 3-6 months",
          "Track energy levels",
          "Monitor skin color and pallor",
          "Note any unusual fatigue",
          "Keep a symptom diary"
        ]
      },
      improvement: {
        increase: [
          "Take iron supplements as prescribed",
          "Pair iron-rich foods with vitamin C",
          "Cook in cast iron cookware",
          "Follow prescribed treatment plan",
          "Regular exercise to stimulate blood production"
        ],
        decrease: [
          "Stay well hydrated",
          "Avoid iron supplements unless prescribed",
          "Regular blood donation if recommended",
          "Follow prescribed medications",
          "Limit red meat consumption"
        ],
        timeline: "Improvement typically seen within 2-4 weeks with proper treatment"
      }
    },
    platelets: {
      description: "Platelets are tiny blood cells that help your body form clots to stop bleeding, essential for wound healing.",
      normalRange: "150,000-450,000 per microliter",
      lowMeaning: "Low platelet count (thrombocytopenia) can increase bleeding risk and cause easy bruising.",
      highMeaning: "High platelet count (thrombocytosis) may increase clotting risk, often due to inflammation or a bone marrow disorder.",
      normalMeaning: "Your platelet count is within healthy range, indicating normal blood clotting ability.",
      function: "Plays a key role in blood clotting and wound healing.",
      symptoms: {
        low: [
          "Easy bruising",
          "Frequent nosebleeds",
          "Prolonged bleeding from cuts",
          "Red spots on the skin",
          "Excessive bleeding"
        ],
        high: [
          "Headache",
          "Dizziness",
          "Chest pain",
          "Weakness",
          "Tingling in hands and feet"
        ],
        normal: [
          "Normal blood clotting",
          "No unusual bruising",
          "Normal wound healing",
          "No spontaneous bleeding"
        ]
      },
      causes: {
        low: [
          "Autoimmune disorders",
          "Viral infections",
          "Heavy alcohol consumption",
          "Leukemia or lymphoma",
          "Certain medications"
        ],
        high: [
          "Inflammation",
          "Infection",
          "Iron deficiency",
          "Surgery or trauma",
          "Bone marrow disorders"
        ],
        normal: [
          "Healthy bone marrow function",
          "Normal immune system activity",
          "Good overall health",
          "Balanced platelet production and destruction"
        ]
      },
      treatment: {
        low: [
          "Avoiding medications that affect platelets",
          "Blood or platelet transfusions",
          "Medications to boost platelet production",
          "Treating underlying conditions",
          "Diet and lifestyle changes"
        ],
        high: [
          "Medications to reduce platelet count",
          "Blood thinners",
          "Aspirin therapy",
          "Treatment of underlying conditions",
          "Regular monitoring"
        ],
        normal: [
          "Maintain healthy lifestyle",
          "Regular exercise",
          "Balanced diet",
          "Regular check-ups"
        ]
      },
      maintenance: {
        diet: [
          "Eat foods rich in vitamin K (leafy greens)",
          "Include vitamin B12 rich foods",
          "Consume foods with folate",
          "Stay hydrated",
          "Limit alcohol consumption"
        ],
        lifestyle: [
          "Regular moderate exercise",
          "Avoid blood thinning medications unless prescribed",
          "Maintain a healthy weight",
          "Get adequate sleep",
          "Manage stress levels"
        ],
        monitoring: [
          "Regular blood tests every 3-6 months",
          "Track any unusual bruising",
          "Monitor bleeding time",
          "Keep a symptom diary",
          "Regular check-ups with healthcare provider"
        ]
      },
      improvement: {
        increase: [
          "Increase vitamin K intake",
          "Take prescribed supplements",
          "Stay hydrated",
          "Follow prescribed medication plan",
          "Get adequate rest"
        ],
        decrease: [
          "Follow prescribed medications",
          "Avoid blood thinning foods",
          "Stay hydrated",
          "Regular exercise",
          "Monitor diet"
        ],
        timeline: "Improvement typically seen within 2-4 weeks with proper treatment"
      }
    },
    hematocrit: {
      description: "Hematocrit measures the percentage of red blood cells in your blood, crucial for oxygen transport.",
      normalRange: "38-50%",
      lowMeaning: "Low hematocrit may indicate anemia or blood loss, leading to decreased oxygen supply.",
      highMeaning: "High hematocrit can cause blood thickening, often due to dehydration, lung disease, or polycythemia vera.",
      normalMeaning: "Your hematocrit level is within healthy range.",
      function: "Assesses the oxygen-carrying capacity of the blood.",
      symptoms: {
        low: [
          "Fatigue",
          "Weakness",
          "Shortness of breath",
          "Pale or yellowish skin",
          "Headache"
        ],
        high: [
          "Dizziness",
          "Headache",
          "Blurred vision",
          "Flushed skin",
          "Increased risk of blood clots"
        ],
        normal: []
      },
      causes: {
        low: [
          "Blood loss",
          "Nutritional deficiencies",
          "Bone marrow disorders",
          "Kidney disease",
          "Chronic illness"
        ],
        high: [
          "Dehydration",
          "High altitude",
          "Lung disease",
          "Polycythemia vera",
          "Smoking"
        ],
        normal: []
      },
      treatment: {
        low: [
          "Iron supplements",
          "Diet adjustments",
          "Treating underlying cause",
          "Blood transfusion",
          "Bone marrow transplant (in severe cases)"
        ],
        high: [
          "Hydration",
          "Blood donation (phlebotomy)",
          "Oxygen therapy",
          "Lifestyle changes",
          "Medications"
        ],
        normal: []
      },
      maintenance: {
        diet: [
          "Iron-rich foods",
          "Vitamin C for iron absorption",
          "Adequate protein intake",
          "Stay well hydrated",
          "Balanced nutrition"
        ],
        lifestyle: [
          "Regular exercise",
          "Avoid smoking",
          "Limit alcohol",
          "Maintain healthy weight",
          "Get adequate sleep"
        ],
        monitoring: [
          "Regular blood tests",
          "Track energy levels",
          "Monitor hydration status",
          "Regular medical check-ups",
          "Note any unusual symptoms"
        ]
      },
      improvement: {
        increase: [
          "Iron supplementation if prescribed",
          "Vitamin C with iron-rich foods",
          "Increase fluid intake",
          "Follow prescribed treatment plan",
          "Regular exercise"
        ],
        decrease: [
          "Increase hydration",
          "Reduce altitude exposure if applicable",
          "Follow prescribed medications",
          "Modify exercise routine",
          "Dietary adjustments"
        ],
        timeline: "Changes typically observed within 4-8 weeks of consistent treatment"
      }
    },
    mcv: {
      description: "Mean Corpuscular Volume (MCV) measures the average size of red blood cells, aiding in anemia diagnosis.",
      normalRange: "80-100 fL",
      lowMeaning: "Low MCV (microcytosis) suggests smaller than average red blood cells, often due to iron deficiency.",
      highMeaning: "High MCV (macrocytosis) indicates larger red blood cells, often due to vitamin B12 or folate deficiency.",
      normalMeaning: "Your MCV is within healthy range.",
      function: "Helps diagnose different types of anemia based on red blood cell size.",
      symptoms: {
        low: [
          "Fatigue",
          "Weakness",
          "Pale skin",
          "Shortness of breath",
          "Dizziness"
        ],
        high: [
          "Fatigue",
          "Pale skin",
          "Shortness of breath",
          "Weakness",
          "Difficulty concentrating"
        ],
        normal: []
      },
      causes: {
        low: [
          "Iron deficiency",
          "Thalassemia",
          "Chronic disease",
          "Lead poisoning",
          "Chronic blood loss"
        ],
        high: [
          "Vitamin B12 deficiency",
          "Folate deficiency",
          "Liver disease",
          "Hypothyroidism",
          "Alcoholism"
        ],
        normal: []
      },
      treatment: {
        low: [
          "Iron supplementation",
          "Dietary adjustments",
          "Treat underlying causes",
          "Vitamin C to improve absorption",
          "Regular monitoring"
        ],
        high: [
          "Vitamin B12 supplements",
          "Folate supplements",
          "Lifestyle changes",
          "Treat underlying conditions",
          "Regular monitoring"
        ],
        normal: []
      },
      maintenance: {
        diet: [
          "Foods rich in vitamin B12",
          "Folate-rich foods (leafy greens)",
          "Iron-rich foods",
          "Balanced protein intake",
          "Avoid excessive alcohol"
        ],
        lifestyle: [
          "Regular exercise",
          "Adequate sleep",
          "Stress management",
          "Avoid smoking",
          "Limit alcohol consumption"
        ],
        monitoring: [
          "Regular blood tests",
          "Track energy levels",
          "Monitor diet changes",
          "Follow-up with healthcare provider",
          "Note any new symptoms"
        ]
      },
      improvement: {
        increase: [
          "Vitamin B12 supplementation",
          "Folic acid supplements",
          "Iron-rich diet",
          "Treat underlying conditions",
          "Follow prescribed medications"
        ],
        decrease: [
          "Iron supplementation if prescribed",
          "Dietary modifications",
          "Treat underlying conditions",
          "Regular monitoring",
          "Follow medical advice"
        ],
        timeline: "Changes typically observed within 6-8 weeks of treatment"
      }
    },
    mch: {
      description: "Mean Corpuscular Hemoglobin (MCH) represents the average amount of hemoglobin per red blood cell.",
      normalRange: "27-33 pg",
      lowMeaning: "Low MCH (hypochromia) can indicate iron deficiency, leading to pale or small red blood cells.",
      highMeaning: "High MCH (hyperchromia) may suggest vitamin B12 or folate deficiency, resulting in larger, fuller red blood cells.",
      normalMeaning: "Your MCH is within healthy range.",
      function: "Useful in diagnosing types of anemia by assessing hemoglobin content in red blood cells.",
      symptoms: {
        low: [
          "Fatigue",
          "Weakness",
          "Pale skin",
          "Shortness of breath",
          "Dizziness"
        ],
        high: [
          "Fatigue",
          "Weakness",
          "Pale skin",
          "Shortness of breath",
          "Memory issues"
        ],
        normal: []
      },
      causes: {
        low: [
          "Iron deficiency",
          "Chronic blood loss",
          "Thalassemia",
          "Chronic disease",
          "Lead poisoning"
        ],
        high: [
          "Vitamin B12 deficiency",
          "Folate deficiency",
          "Liver disease",
          "Hypothyroidism",
          "Alcoholism"
        ],
        normal: []
      },
      treatment: {
        low: [
          "Iron supplementation",
          "Dietary adjustments",
          "Treat underlying causes",
          "Regular monitoring",
          "Vitamin C to enhance iron absorption"
        ],
        high: [
          "Vitamin B12 supplements",
          "Folate supplements",
          "Lifestyle changes",
          "Treat underlying conditions",
          "Regular monitoring"
        ],
        normal: []
      },
      maintenance: {
        diet: [
          "Iron-rich foods",
          "Vitamin C sources",
          "B-vitamin rich foods",
          "Protein-rich foods",
          "Balanced nutrition"
        ],
        lifestyle: [
          "Regular moderate exercise",
          "Adequate hydration",
          "Proper sleep habits",
          "Stress reduction",
          "Avoid smoking"
        ],
        monitoring: [
          "Regular blood tests",
          "Track dietary changes",
          "Monitor energy levels",
          "Regular check-ups",
          "Record any symptoms"
        ]
      },
      improvement: {
        increase: [
          "Iron supplementation",
          "Vitamin B12 supplements",
          "Folate supplementation",
          "Dietary improvements",
          "Treat underlying conditions"
        ],
        decrease: [
          "Adjust iron intake",
          "Dietary modifications",
          "Treat underlying causes",
          "Regular monitoring",
          "Follow medical advice"
        ],
        timeline: "Improvement typically seen within 4-8 weeks with appropriate treatment"
      }
    }
  };