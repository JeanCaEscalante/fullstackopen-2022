


export const calculateBmi = (height: number, weight: number): string => {
    const h = height / 100;
    const bmi = ( weight / Math.pow(h, 2));

    if(bmi < 16.0){
        return "Underweight (Severe thinness)"
    }
    else if(bmi >= 16.0 && bmi <= 16.9 ){
        return "Underweight (Moderate thinness)"
    }
    else if(bmi >= 16.0 && bmi <= 16.9 ){
        return "Underweight (Moderate thinness)"
    }
    else if(bmi >= 17.0 && bmi <= 18.4 ){
        return "Underweight (Mild thinness)"
    }
    else if(bmi >= 18.5 && bmi <= 24.9 ){
        return "Normal range"
    }
    else if(bmi >= 25.0 && bmi <= 29.9 ){
        return "Overweight (Pre-obese)"
    }
    else if(bmi >= 30.0 && bmi <= 34.9 ){
        return "Obese (Class I)"
    }
    else if(bmi >= 35.0 && bmi <= 39.9 ){
        return "Obese (Class II)"
    }
    else if(bmi >= 40.0){
        return "Obese (Class III)"
    }
    
    return "";
}

try {
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}
