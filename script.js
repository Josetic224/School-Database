let students = [];

// Set max date for the date input to prevent future year selection
document.getElementById('graduation-year').setAttribute('max', new Date().toISOString().split('T')[0]);

// Implementing localStorage persistence
if (localStorage.getItem('students')) {
  students = JSON.parse(localStorage.getItem('students'));
  displayClasses();
  displayDashboard();
}

document.getElementById('student-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('student-name').value;
  const studentClass = document.getElementById('student-class').value;
  const graduationYear = new Date(document.getElementById('graduation-year').value).getFullYear();
  const age = document.getElementById('student-age').value;
  const address = document.getElementById('student-address').value;
  const phone = document.getElementById('student-phone').value;
  const email = document.getElementById('student-email').value;

  if (!graduationYear || graduationYear > new Date().getFullYear()) {
    alert('Please select a valid graduation year (not in the future).');
    return;
  }

  const student = {
    name,
    class: studentClass,
    graduationYear,
    age,
    address,
    phone,
    email
  };

  students.push(student);
  localStorage.setItem('students', JSON.stringify(students)); // Save to localStorage
  displayClasses();
  displayDashboard();
});

function displayClasses() {
  const classesContainer = document.getElementById('classes-container');
  classesContainer.innerHTML = '';

  const classes = {};

  students.forEach(student => {
    if (!classes[student.class]) {
      classes[student.class] = [];
    }
    classes[student.class].push(student);
  });

  for (let className in classes) {
    const classCard = document.createElement('div');
    classCard.classList.add('class-card');

    const classHeading = document.createElement('h3');
    classHeading.textContent = `Class ${className}`;
    classCard.appendChild(classHeading);

    const studentList = document.createElement('ul');
    classes[className].forEach(student => {
      const listItem = document.createElement('li');
      listItem.textContent = `${student.name} (Graduation Year: ${student.graduationYear}, Age: ${student.age}, Address: ${student.address}, Phone: ${student.phone}, Email: ${student.email})`;
      studentList.appendChild(listItem);
    });
    classCard.appendChild(studentList);

    classesContainer.appendChild(classCard);
  }
}

function filterByGraduationYear() {
  const filterYear = document.getElementById('graduation-year-filter').value;
  const filteredStudents = students.filter(student => student.graduationYear == filterYear);
  updateClassList(filteredStudents);
}

function updateClassList(filteredStudents) {
  const classesContainer = document.getElementById('classes-container');
  classesContainer.innerHTML = '';

  const classes = {};
  filteredStudents.forEach(student => {
    if (!classes[student.class]) {
      classes[student.class] = [];
    }
    classes[student.class].push(student);
  });

  for (let className in classes) {
    const classCard = document.createElement('div');
    classCard.classList.add('class-card');

    const classHeading = document.createElement('h3');
    classHeading.textContent = `Class ${className}`;
    classCard.appendChild(classHeading);

    const studentList = document.createElement('ul');
    classes[className].forEach(student => {
      const listItem = document.createElement('li');
      listItem.textContent = `${student.name} (Graduation Year: ${student.graduationYear}, Age: ${student.age}, Address: ${student.address}, Phone: ${student.phone}, Email: ${student.email})`;
      studentList.appendChild(listItem);
    });
    classCard.appendChild(studentList);

    classesContainer.appendChild(classCard);
  }
}

function displayDashboard() {
  const totalStudents = students.length;
  const currentStudents = students.filter(student => student.graduationYear > 2023).length;
  const graduates = totalStudents - currentStudents;

  document.getElementById('total-students').textContent = totalStudents;
  document.getElementById('current-students').textContent = currentStudents;
  document.getElementById('graduates').textContent = graduates;
}
