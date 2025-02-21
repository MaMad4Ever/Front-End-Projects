const btn = document.getElementById("calculate");
btn.addEventListener("click", function() {

    let height = document.querySelector("#height").value;
    let weight = document.querySelector("#weight").value;

    if(height == "" || weight == "") {
        alert("Error: Enter height & weight");
        return;
    }

    height = height / 100;

    let BMI = (weight / (height * height));
        BMI = BMI.toFixed(2);

        document.querySelector("#result").innerHTML = BMI;

        let status = '';
        let color = "";

        if (BMI < 18.5){
            status = "Underweight";
            color = "#e49b2a";
        }

        if (BMI >= 18.5 && BMI < 25){
            status = "Healthy weight";
            color = "#008137";
        }

        if (BMI >= 25 && BMI < 30){
            status = "Overweight";
            color = "#ffe400";
        }

        if (BMI >= 30){
            status = "Obese";
            color = "#b90606";
        }

        document.querySelector(".comment").innerHTML = `<span class="comment" style="color:${color};">${status}</span`;

    });
