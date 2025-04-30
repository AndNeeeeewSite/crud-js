//             querySelector
renderItem = document.querySelector('#students-table').children[1]
siteURL = 'http://localhost:3000'
renderButton = document.querySelector('#get-students-btn')
studentForm = document.querySelector('#add-student-form')
editStudentForm = document.querySelector('#edit-student-form')
deleteStudentForm = document.querySelector('#delete-student-form')
//           Code

   // Функція для видалення студента
   
   function deleteStudent(id) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
        };
    fetch( siteURL + '/students/'+ id, options)
        .then(response => response.json())
        .then(data => getStudents(data))
        .catch(error => console.log(error));
       
   
    }
// Функція для отримання всіх студентів
function getStudents() {  
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    };
    
    fetch( siteURL + '/students', options)
        .then(response => response.json())
        .then(data => renderStudents(data))
        .catch(error => console.log("ERROR " + error));
    }
   
   // Функція для відображення студентів у таблиці
   
   function renderStudents(students) {
       
        renderItem.innerHTML = ''
        for(item of students){
            addData = document.createElement('tr')
            id = document.createElement('th')
            id.textContent = item.id
            itemName = document.createElement('th')
            itemName.textContent = item.name
            age = document.createElement('th')
            age.textContent = item.age
            course = document.createElement('th')
            course.textContent = item.course
            skills = document.createElement('th')
            skills.textContent = item.skills
            email = document.createElement('th')
            email.textContent = item.email
            itemStatus = document.createElement('th')
            itemStatus.textContent = item.isEnrolled
            buttonTH = document.createElement('th')
            button = document.createElement('button')
            button.textContent = 'Видалити'
            button.addEventListener('click',function(){
                delete_id_this = this.parentNode.parentNode.children[0].textContent
                deleteStudent(delete_id_this)
                getStudents()
            })
            buttonTH.append(button)
            addData.append(id)
            addData.append(itemName)
            addData.append(age)
            addData.append(course)
            addData.append(skills)
            addData.append(email)
            addData.append(itemStatus)
            addData.append(buttonTH)
            renderItem.append(addData)
        }
   }
   
   
   
   // Функція для додавання нового студента
   
   function addStudent(e) {
    const options = {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
        };
    fetch( siteURL + '/students', options)
        .then(response => response.json())
        .then(data => getStudents(data))
        .catch(error => console.log("ERROR " + error));
}
   
   
   
   // Функція для оновлення студента
   
   function updateStudent(student,id) {
    const options = {
        method: "PATCH",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
        };
    fetch( siteURL + '/students/'+ id, options)
        .then(response => response.json())
        .then(data => getStudents(data))
        .catch(error => alert('Enter real ID'));
    }
   

renderButton.addEventListener('click',function(){
    getStudents()
})

studentForm.addEventListener('submit',function(e){


    skills = document.querySelector('#skills').value.split(',')
    studentToadd = {
        "name": document.querySelector('#name').value + '',
        "age": document.querySelector('#age').value + '',
        "course": document.querySelector('#course').value + '',
        "skills": skills,
        "email": document.querySelector('#email').value + '',
        "isEnrolled": document.querySelector('#isEnrolled').checked 
    }
    addStudent(studentToadd)
})


editStudentForm.addEventListener('submit',function(e){
    edit_skills = document.querySelector('#skills').value.split(',')
    studentToEdit = {
        "name": document.querySelector('#edit_name').value + '',
        "age": document.querySelector('#edit_age').value + '',
        "course": document.querySelector('#edit_course').value + '',
        "skills": edit_skills,
        "email": document.querySelector('#edit_email').value + '',
        "isEnrolled": document.querySelector('#edit_isEnrolled').checked 
    }
    updateStudent(studentToEdit,document.querySelector('#edit_id').value + '')
})
deleteStudentForm.addEventListener('submit',function(e){
    deleteStudent(document.querySelector('#delete_id').value + '')
})

getStudents()