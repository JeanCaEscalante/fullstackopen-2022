import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json())


app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { query } = req;
  const height = String(query.height);
  const weight = String(query.weight);
  const regex = /^[0-9]*$/;
  
  if(!regex.test(height) || !regex.test(weight)) {
    res.send({error: "malformatted parameters"});
  }
  
  const bmi:string = calculateBmi(Number(height), Number(weight))

  res.send({
    height: height,
    weight: weight,
    bmi: bmi,
  });

});

app.post('/exercises', (req, res) => {

  const {hour, hours} = req.body;
  const regex =  /^[0-9]+([.])?([0-9]+)?$/;
  
  if (!regex.test(hour) || hours.length === 0){
   return res.send({
      error: "parameters missing"
    })
  }
  
 if(!hours.every((value: any) => regex.test(value))){
    return res.send({
      error: "malformatted parameters"
    })
  }

  const data = calculateExercises(hour, hours);

  return res.send(data);

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});