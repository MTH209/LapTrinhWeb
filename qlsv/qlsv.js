
class Student {
    constructor(id, name, gender, dob, address) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.address = address;
    }
}
class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.displayStudents();
    }

    addStudent(student) {
        this.students.push(student);
        this.updateLocalStorage();
        this.displayStudents();
    }

    editStudent(index, updatedStudent) {
        this.students[index] = updatedStudent;
        this.updateLocalStorage();
        this.displayStudents();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.updateLocalStorage();
        this.displayStudents();
    }

    updateLocalStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    displayStudents() {
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';
        this.students.forEach((student, index) => {
            const row = `<tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.address}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xóa</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }
}

const manager = new StudentManager();
function addStudent() {
    const id = document.getElementById('studentID').value;
    const name = document.getElementById('studentName').value;
    const gender = document.getElementById('studentGender').value;
    const dob = document.getElementById('studentDOB').value;
    const address = document.getElementById('studentAddress').value;
    const student = new Student(id, name, gender, dob, address);

    manager.addStudent(student);

    document.getElementById('studentForm').reset();
}
function editStudent(index) {
    const student = manager.students[index];
    document.getElementById('studentID').value = student.id;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentGender').value = student.gender;
    document.getElementById('studentDOB').value = student.dob;
    document.getElementById('studentAddress').value = student.address;
    
    document.querySelector('button[type="button"]').onclick = function () {
        updateStudent(index);
    };
}

function updateStudent(index) {
    const id = document.getElementById('studentID').value;
    const name = document.getElementById('studentName').value;
    const gender = document.getElementById('studentGender').value;
    const dob = document.getElementById('studentDOB').value;
    const address = document.getElementById('studentAddress').value;
    const updatedStudent = new Student(id, name, gender, dob, address);

    manager.editStudent(index, updatedStudent);

    document.getElementById('studentForm').reset();
    document.querySelector('button[type="button"]').onclick = addStudent;
}
function deleteStudent(index) {
    manager.deleteStudent(index);
}
