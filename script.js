const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

const roleButtons = document.querySelectorAll('.role-btn');
const studentFields = document.querySelector('.student-only');
const tokenField = document.querySelector('#token');
const tokenLabel = document.querySelector('label[for="token"]');

roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        roleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const role = button.dataset.role;
        
        if (studentFields) {
            studentFields.style.display = role === 'student' ? 'block' : 'none';
        }

        if (tokenLabel) {
            switch (role) {
                case 'dean':
                    tokenLabel.textContent = 'Admin Invitation Token';
                    break;
                case 'hod':
                    tokenLabel.textContent = 'Dean Invitation Token';
                    break;
                case 'lecturer':
                    tokenLabel.textContent = 'HOD Invitation Token';
                    break;
                case 'student':
                    tokenLabel.textContent = 'Student Invitation Token';
                    break;
            }
        }
    });
});


const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.querySelector('.role-btn.active').dataset.role;
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            password: document.getElementById('password').value,
            token: document.getElementById('token').value,
            role: role
        };

        if (role === 'student') {
            formData.registrationNumber = document.getElementById('registrationNumber').value;
        }
        
        console.log('Form Data:', formData);
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        console.log('Login Data:', formData);
        window.location.href = './dashboards/dean-departments.html';
    });
} 

// Mark Entry Modal Functions
function openMarkEntry() {
    const modal = document.getElementById('markEntryModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMarkEntry() {
    const modal = document.getElementById('markEntryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showConfirmation() {
    const markModal = document.getElementById('markEntryModal');
    const confirmModal = document.getElementById('confirmationModal');
    markModal.classList.remove('active');
    confirmModal.classList.add('active');
}

function closeConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle mark entry form submission
const markEntryForm = document.getElementById('markEntryForm');
if (markEntryForm) {
    markEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would normally collect and validate the form data
        const formData = {
            assessmentType: document.getElementById('assessmentType').value,
            maxMarks: document.getElementById('maxMarks').value,
            marks: Array.from(document.querySelectorAll('.mark-input')).map(input => input.value),
            comments: Array.from(document.querySelectorAll('.comment-input')).map(input => input.value)
        };
        
        console.log('Mark Entry Data:', formData);
        showConfirmation();
    });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('markEntryModal');
    if (e.target === modal) {
        closeMarkEntry();
    }
});

// Close modal when clicking close button
document.querySelector('.close-modal')?.addEventListener('click', closeMarkEntry); 

// Student Dashboard Functions
function openClaimModal(courseCode, courseName) {
    const modal = document.getElementById('claimModal');
    const courseInfo = document.getElementById('courseInfo');
    courseInfo.value = `${courseCode} - ${courseName}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeClaimModal() {
    const modal = document.getElementById('claimModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function printResults() {
    window.print();
}

// Handle claim form submission
const claimForm = document.getElementById('claimForm');
if (claimForm) {
    claimForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            course: document.getElementById('courseInfo').value,
            claimType: document.getElementById('claimType').value,
            reason: document.getElementById('claimReason').value,
            evidence: document.getElementById('evidence').files[0]
        };
        
        console.log('Claim Data:', formData);
        
        // Close claim modal and show confirmation
        closeClaimModal();
        const confirmModal = document.getElementById('confirmationModal');
        confirmModal.classList.add('active');
    });
}

// Department Management Functions
function openAddDeptModal() {
    const modal = document.getElementById('addDeptModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddDeptModal() {
    const modal = document.getElementById('addDeptModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openEditDeptModal(deptCode) {
    const modal = document.getElementById('addDeptModal');
    const form = document.getElementById('addDeptForm');
    const title = modal.querySelector('.modal-header h2');
    
    // Populate form with department data (example data)
    document.getElementById('deptName').value = 'Computer Science';
    document.getElementById('deptCode').value = deptCode;
    document.getElementById('hodName').value = 'Dr. Sarah Johnson';
    document.getElementById('deptDesc').value = 'Department of Computer Science and Software Engineering';
    
    title.textContent = 'Edit Department';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function confirmDeleteDept(deptCode) {
    const modal = document.getElementById('deleteConfirmModal');
    modal.dataset.deptCode = deptCode;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeleteConfirmModal() {
    const modal = document.getElementById('deleteConfirmModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function deleteDepartment() {
    const modal = document.getElementById('deleteConfirmModal');
    const deptCode = modal.dataset.deptCode;
    console.log(`Deleting department: ${deptCode}`);
    // Here you would normally make an API call to delete the department
    closeDeleteConfirmModal();
}

function viewDepartmentDetails(deptCode) {
    const modal = document.getElementById('deptDetailsModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Update modal content based on department code
    const deptName = document.querySelector(`[onclick="viewDepartmentDetails('${deptCode}')"]`)
        .closest('.department-card')
        .querySelector('h3').textContent;
    
    modal.querySelector('.modal-header h2').textContent = `${deptName} Details`;
    
    // Here you would normally fetch department details from the server
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Prevent modal from closing when clicking inside
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function closeDeptDetailsModal() {
    const modal = document.getElementById('deptDetailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const deptDetailsModal = document.getElementById('deptDetailsModal');
    if (e.target === deptDetailsModal) {
        closeDeptDetailsModal();
    }
});

// Handle department form submission
const addDeptForm = document.getElementById('addDeptForm');
if (addDeptForm) {
    addDeptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('deptName').value,
            code: document.getElementById('deptCode').value,
            hod: document.getElementById('hodName').value,
            description: document.getElementById('deptDesc').value
        };
        
        console.log('Department Data:', formData);
        closeAddDeptModal();
    });
}

// Update navigation in dean dashboard
const departmentsLink = document.querySelector('a[href="#"].nav-item:nth-child(2)');
if (departmentsLink) {
    departmentsLink.href = 'dean-departments.html';
} 