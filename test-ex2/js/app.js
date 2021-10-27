var btn = document.querySelector(".add-btn button")
var count=document.querySelector(".icons label span")
var count2=document.querySelector(".icons2 label span")
var btnmodal=document.querySelector(".inputs button")
var buttonclose=document.querySelector(".modal-footer button")
var modal=document.querySelector(".modal")
var error = false;
var i=0;
count.innerHTML=i
btn.onclick = () => {
    let student = getStudentData();
    if(student.fullname != ''){
        
        if (student.fullname.length < 3) {
            error = true
            message1.innerHTML = '<p>Minimum 3 hərfdən istifadə olunmalıdır</p>'

        } else {
            error = false
            message1.innerHTML = ''
        }

        if (!error && student.fullname.length > 3) {
            i++;
            var tr =
                `<tr data-index="${i}">
                    <th scope="row">${i}</th>
                    <td>${student.fullname}</td>
                    <td class="examine"><span>İmtahan</span></td>
                    <td class="minscore"></td>
                    <td class="maxscore"></td>
                    <td class="averagescore"></td>

                  </tr>
                `
            document.querySelector('table tbody').insertAdjacentHTML('beforeend', tr);
            count.innerHTML=i
            document.getElementById("full-name").value = "";
            writescore()

            
        }
    }
}
let scores=[]
function writescore(){
    var exambtn=document.querySelectorAll(".examine span")
    scores.splice(0,scores.length)
    var c=0;
    exambtn.forEach(exambton => {
        exambton.addEventListener("click",function(e){
            
            exambton.setAttribute("data-bs-target", "#exampleModal")
            exambton.setAttribute("data-bs-toggle", "modal")
            var id=e.target.parentElement.parentElement.getAttribute('data-index')
            var tr;
            btnmodal.onclick=()=>{
                let student = getStudentData();
                
                if(student.point != ''){
                    error = false
                    messagepoint.innerHTML = ''
                    scores.push(student.point)
                    console.log(scores)
                    var maxscore=Math.max(...scores)
                    var minscore=Math.min(...scores)
                    let sum=0;
                    for (let i = 0; i < scores.length; i++) {
                        sum += parseInt(scores[i]);
                    }
                    console.log("sumod"+sum);
                    console.log(id)
                    c++; 
                    this.parentElement.parentElement.children[4].innerHTML=maxscore
                    this.parentElement.parentElement.children[3].innerHTML=minscore
                    this.parentElement.parentElement.children[5].innerHTML=sum/c
                    tr =
                        `<tr>
                            <th scope="row">${c}</th>
                            <td>${student.examname}</td>
                            <td class="examine">${student.point}</td>
                          </tr>
                        `
                    document.querySelector('.tableexam tbody').insertAdjacentHTML('beforeend', tr);
                    count2.innerHTML=c
                }
            }
            $(document).mouseup(function (e) {
                if ($(e.target).closest(".modal").length=== 0) {
                $(".tableexam tbody tr").remove();                              
                }
            });
            
            buttonclose.onclick=()=>{
                $(".tableexam tbody tr").remove();
            }
        })
    });
}




function getStudentData() {
    var fullname = document.getElementById("full-name").value;
    var examname=document.getElementById("subject").value;
    var point=document.getElementById("point").value;
    

    return {
        fullname:fullname,
        examname:examname,
        point:point
    }
}



