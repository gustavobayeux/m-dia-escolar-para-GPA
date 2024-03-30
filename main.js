


a = false;

function elToggle(el, toggleClass1, toggleClass2, onlyClass) {


    el = document.getElementById(el);

    if (onlyClass) {
        el.classList.remove();
        el.classList.add(toggleClass1);
        return;
    }
    if (a) {

        el.classList.remove(toggleClass1);
        el.classList.add(toggleClass2);
        a = false;
    } else {
        el.classList.add(toggleClass1);
        el.classList.remove(toggleClass2);

        a = true;
    }


}


b = false;

function elToggle2(el, toggleClass1, toggleClass2, onlyClass) {


    el = document.getElementById(el);

    if (onlyClass) {
        el.classList.remove();
        el.classList.add(toggleClass1);
        return;
    }
    if (b) {

        el.classList.remove(toggleClass1);
        el.classList.add(toggleClass2);
        b = false;
    } else {
        el.classList.add(toggleClass1);
        el.classList.remove(toggleClass2);
        b = true;
    }


}

function showForm(type) {

    types = new Array();
    types[1] = "gpa"
    types[2] = "stats"
    types[3] = "uni"

    switch (type) {
        case 1:
            document.getElementById(types[type] + "Form").style.display = "block"
            document.getElementById(types[type] + "Button").classList.add("selected");

            document.getElementById(types[2] + "Button").classList.remove("selected");
            document.getElementById(types[3] + "Button").classList.remove("selected");
            document.getElementById(types[2] + "Form").style.display = "none"
            document.getElementById(types[3] + "Form").style.display = "none"
            break;
        case 2:
            document.getElementById(types[type] + "Form").style.display = "block"
            document.getElementById(types[type] + "Button").classList.add("selected");

            document.getElementById(types[1] + "Button").classList.remove("selected");
            document.getElementById(types[3] + "Button").classList.remove("selected");
            document.getElementById(types[1] + "Form").style.display = "none"
            document.getElementById(types[3] + "Form").style.display = "none"
            break;
        case 3:
            document.getElementById(types[type] + "Form").style.display = "block"
            document.getElementById(types[type] + "Button").classList.add("selected");

            document.getElementById(types[1] + "Button").classList.remove("selected");
            document.getElementById(types[2] + "Button").classList.remove("selected");
            document.getElementById(types[1] + "Form").style.display = "none"
            document.getElementById(types[2] + "Form").style.display = "none"
            break;
    }
}

function getOption(el) {
    value = Array.from(el.selectedOptions)[0].getAttribute('value')
    return value;

}


var loaded = false;
const GPA = {


    set extra(value) {
        this.subjects = ['biologia', 'gramática', 'história', 'literatura',
            'matemática', 'tecnologia', 'fisica'].concat(value.split(','));
    },
    set country(value) {
        this.country = value;
    },
    loadsubjects() {

        if (loaded == false) {

            for (i = 0; i <= this.subjects.length - 1; i++) {


                document.getElementById("gradingTable").innerHTML
                    +=
                    "<tr><td>" + this.subjects[i] + `</td><td>
                <input required min='0' max='10' step='0.5' type='number'  id='${this.subjects[i].substring(0, 3)}_points'> 
        
        </td></tr>`;


            }
            loaded = true;
        }

    },
    calc() {
        if (this.country !== '' && this.subjects.length !== 0) {

            switch (this.country) {
                //Kinda like an associative Array

                //EVERY class has points: an A will give 4 for example
                //Different Scales attribute different points

                //Switch structure organized according to similarity between systems
                case 'us':
                    //Percentage adding up to 4
                    /* 
                    According to thecollegeinvestor.com
                    "Different schools may do this in different ways"
                    */
                    var scale = {
                        'A+': 100,
                        'A': 89,
                        'A-': 84,
                        'B+': 79,
                        'B': 76,
                        'B-': 72,
                        'C+': 69,
                        'C': 66,
                        'C-': 62,
                        'D+': 59,
                        'D': 59,
                        'F': 49,
                        'F': 0
                    };

                    break;

                case 'uk':
                    /* 
                    According to scholaro and Cam <3"
                    */
                    var scale = {
                        'First Class Honours': 100,
                        'Second Class Honours': 60,
                        'Third class': 50,
                        'Pass': 40,
                        'Fail': 0,
                    };

                    break;

                case 'in':
                    //According to Leverage Edu
                    var scale = {
                        'A+': 100,
                        'A': 96,
                        'A-': 92,
                        'B+': 89,
                        'B': 86,
                        'B-': 82,
                        'C+': 79,
                        'C': 76,
                        'C-': 72,
                        'D+': 69,
                        'D': 66,
                        'F': 0
                    };
                    break;
                case 'nz':
                    //Data According to Univesity of Canterburry
                    //Checked accordingly to Scholaro
                    //Also, UC accepts from C- to up
                    var scale = {
                        'A+': 100,
                        'A': 89.9,
                        'A-': 84.9,
                        'B+': 79.9,
                        'B': 74.9,
                        'B-': 69.9,
                        'C+': 64.9,
                        'C': 59.9,
                        'C-': 54.9,
                        'D': 49.9,
                        'E': 39.9,
                        'E': 0,
                    };
                    break;
                case 'au':
                    var scale = {
                        'High Distinction': 100,
                        'Distinction': 84,
                        'Credit': 74,
                        'Pass': 64,
                        'Fail': 49,
                        'Withdrawn Fail': 0
                    };
                    break;
                case 'jp':
                    /**
                     *According to scholaro
                     *Also checked on mavink.com
                     *Also checked on hello-japan.weebly.com 
                     *They usually use letters (just look at One Punch Man lol)
                    */
                    var scale = {
                        "S": 100,
                        "A+": 100,
                        "A": 90,
                        "B": 80,
                        "C": 70,
                        "D": 60
                    };



                    break;

            }

        } else {
            console.log("Error: subjects and/or country not set");
        }
        //Different Scales attribute different points
        points = [];
        gpaResult = document.getElementById("gpaResult");
        gpaResult.classList.remove('opacity-5');
        gpaResult.innerHTML += `
            <br><br>
            <tr>
            <th>Matéria</th>
                <th>Pontos</th>
                <th>Nota estrangeira</th>
              
            </tr>`;
        for (b = 0; b < this.subjects.length; b++) {
            loop = false;


            Object.keys(scale).forEach(gradePercent => {

                if (loop == false && (parseInt(document.getElementById(this.subjects[b].substring(0, 3)
                    + "_points").value) * 10) >= scale[gradePercent]) {

                    points.push((4 / 100) * parseInt(document.getElementById(this.subjects[b].substring(0, 3) + "_points").value)
                        * 10).toFixed(2);

                    gpaResult.innerHTML +=
                        "<tr><td>" +
                        this.subjects[b][0].toUpperCase() + this.subjects[b].substr(1) + "</td><td>" +
                        ((4 / 100) * parseInt(document.getElementById(this.subjects[b].substring(0, 3) + "_points").value) * 10).toFixed(2) +
                        "</td>" +
                        "<td>" + gradePercent + "</td></tr>";

                    console.log()
                    loop = true;
                }
            });
            continue;

        }

        gpaResult.innerHTML += `</table> <br><b>GPA ACUMULADO: ${(points.reduce((a, b) => a + b, 0) / points.length).toFixed(2)}</b><br>`


    },
    subjects: [],
    country: ''
};
