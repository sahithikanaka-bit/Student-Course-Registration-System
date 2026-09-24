let courses = [
    {
        code: "CS101",
        title: "Java Programming",
        description: "Object-oriented programming using Java",
        capacity: 30,
        registered: 0,
        schedule: "Monday 10:00 AM"
    },
    {
        code: "AI201",
        title: "Artificial Intelligence",
        description: "Fundamentals of artificial intelligence",
        capacity: 25,
        registered: 0,
        schedule: "Tuesday 11:00 AM"
    },
    {
        code: "DS301",
        title: "Data Structures",
        description: "Data structures and algorithms",
        capacity: 30,
        registered: 0,
        schedule: "Wednesday 2:00 PM"
    },
    {
        code: "ML401",
        title: "Machine Learning",
        description: "Machine learning fundamentals",
        capacity: 25,
        registered: 0,
        schedule: "Thursday 3:00 PM"
    }
];

let students = [];

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "courses") {
        displayCourses();
    }

    if (pageId === "register") {
        loadCourses();
    }

    updateDashboard();
}

function displayCourses() {

    const list = document.getElementById("courseList");

    list.innerHTML = "";

    courses.forEach(course => {

        let available = course.capacity - course.registered;

        list.innerHTML += `
            <div class="course">
                <h3>${course.code} - ${course.title}</h3>
                <p><b>Description:</b> ${course.description}</p>
                <p><b>Schedule:</b> ${course.schedule}</p>
                <p><b>Capacity:</b> ${course.capacity}</p>
                <p><b>Available Slots:</b> ${available}</p>
            </div>
        `;
    });
}

function loadCourses() {

    const select = document.getElementById("courseSelect");

    select.innerHTML = `<option value="">Select Course</option>`;

    courses.forEach(course => {

        let available = course.capacity - course.registered;

        if (available > 0) {

            select.innerHTML += `
                <option value="${course.code}">
                    ${course.code} - ${course.title}
                </option>
            `;
        }
    });
}

function registerCourse() {

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const courseCode = document.getElementById("courseSelect").value;
    const message = document.getElementById("registerMessage");

    if (!id || !name || !courseCode) {
        message.textContent = "Please fill all details.";
        return;
    }

    let student = students.find(s => s.id === id);

    if (!student) {

        student = {
            id: id,
            name: name,
            courses: []
        };

        students.push(student);
    }

    if (student.courses.includes(courseCode)) {
        message.textContent = "You are already registered for this course.";
        return;
    }

    let course = courses.find(c => c.code === courseCode);

    if (course.registered >= course.capacity) {
        message.textContent = "This course is full.";
        return;
    }

    student.courses.push(courseCode);

    course.registered++;

    message.textContent =
        "Course registered successfully!";

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";

    loadCourses();
    updateDashboard();
}

function viewCourses() {

    const id =
        document.getElementById("viewStudentId").value.trim();

    const output =
        document.getElementById("myCourseList");

    let student = students.find(s => s.id === id);

    if (!student) {
        output.innerHTML = "<p>Student not found.</p>";
        return;
    }

    if (student.courses.length === 0) {
        output.innerHTML =
            "<p>No courses registered.</p>";
        return;
    }

    output.innerHTML = `
        <h3>${student.name}</h3>
        <p>Student ID: ${student.id}</p>
    `;

    student.courses.forEach(code => {

        let course = courses.find(c => c.code === code);

        output.innerHTML += `
            <div class="registered">
                <b>${course.code} - ${course.title}</b>
                <p>${course.schedule}</p>
            </div>
        `;
    });
}

function dropCourse() {

    const id =
        document.getElementById("dropStudentId").value.trim();

    const code =
        document.getElementById("dropCourseCode").value
        .trim()
        .toUpperCase();

    const message =
        document.getElementById("dropMessage");

    let student = students.find(s => s.id === id);

    if (!student) {
        message.textContent = "Student not found.";
        return;
    }

    let index = student.courses.indexOf(code);

    if (index === -1) {
        message.textContent =
            "This course is not registered.";
        return;
    }

    student.courses.splice(index, 1);

    let course = courses.find(c => c.code === code);

    course.registered--;

    message.textContent =
        "Course dropped successfully.";

    updateDashboard();
}

function updateDashboard() {

    document.getElementById("courseCount").textContent =
        courses.length;

    document.getElementById("studentCount").textContent =
        students.length;

    let availableCourses =
        courses.filter(c => c.registered < c.capacity).length;

    document.getElementById("availableCount").textContent =
        availableCourses;
}

displayCourses();
updateDashboard();