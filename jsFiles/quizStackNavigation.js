import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScenarioQuiz from './scenarioQuiz';
import Quiz1 from './quizzes/quiz1';
import Quiz2 from './quizzes/quiz2';
import Quiz3 from './quizzes/quiz3';
import Quiz4 from './quizzes/quiz4';

const QuizStack = createStackNavigator();

function QuizStackNavigation() {
  return (
    <QuizStack.Navigator 
    screenOptions = {{
        headerStyle: { 
          backgroundColor: '#0072A3',
          height: 130
        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <QuizStack.Screen
        name="Learn"
        component={ScenarioQuiz}
        options={{ 
          title: 'Learn'
        }}
      />
      <QuizStack.Screen 
        name="Quiz1" 
        component={Quiz1}
        options={{  
          title: 'Quiz1',
          headerTintColor: 'white',
        }} 
      />
      <QuizStack.Screen 
        name="Quiz2" 
        component={Quiz2}
        options={{  
          title: 'Quiz2',
          headerTintColor: 'white',
        }} 
      />
      <QuizStack.Screen 
        name="Quiz3" 
        component={Quiz3}
        options={{  
          title: 'Quiz3',
          headerTintColor: 'white',
        }} 
      />
      <QuizStack.Screen 
        name="Quiz4" 
        component={Quiz4}
        options={{  
          title: 'Quiz4',
          headerTintColor: 'white',
        }} 
      />
    </QuizStack.Navigator>
  );
}

export default QuizStackNavigation;
