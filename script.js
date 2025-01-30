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
        window.location.href = './dashboards/dean-dashboard.html';
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

// Update HOD Management navigation
const hodManagementLink = document.querySelector('a[href="#"].nav-item:nth-child(3)');
if (hodManagementLink) {
    hodManagementLink.href = 'dean-hod.html';
}

// Update School Performance navigation
const performanceLink = document.querySelector('a[href="#"].nav-item:nth-child(4)');
if (performanceLink) {
    performanceLink.href = 'dean-performance.html';
}

// Update Settings navigation
const settingsLink = document.querySelector('a[href="#"].nav-item:nth-child(5)');
if (settingsLink) {
    settingsLink.href = 'dean-settings.html';
}

// HOD Management Functions
function openAddHodModal() {
    const modal = document.getElementById('addHodModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddHodModal() {
    const modal = document.getElementById('addHodModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openEditHodModal(hodId) {
    const modal = document.getElementById('addHodModal');
    const form = document.getElementById('addHodForm');
    const title = modal.querySelector('.modal-header h2');
    
    // Populate form with HOD data (example data)
    document.getElementById('hodName').value = 'Dr. Sarah Johnson';
    document.getElementById('department').value = 'CS';
    document.getElementById('email').value = 'sarah.johnson@university.edu';
    document.getElementById('phone').value = '+1234567890';
    document.getElementById('qualification').value = 'PhD in Computer Science';
    document.getElementById('experience').value = '8';
    
    title.textContent = 'Edit HOD Details';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Handle HOD form submission
const addHodForm = document.getElementById('addHodForm');
if (addHodForm) {
    addHodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('hodName').value,
            department: document.getElementById('department').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            qualification: document.getElementById('qualification').value,
            experience: document.getElementById('experience').value
        };
        
        console.log('HOD Data:', formData);
        closeAddHodModal();
    });
}

function viewHodProfile(hodId) {
    const modal = document.getElementById('viewProfileModal');
    
    // Here you would normally fetch HOD data from the server
    // For now, we'll use example data
    const hodData = {
        name: 'Dr. Sarah Johnson',
        department: 'Computer Science Department',
        qualification: 'PhD in Computer Science',
        email: 'sarah.johnson@university.edu',
        phone: '+1234567890',
        office: 'Room 405, ICT Building',
        experience: '8 years experience',
        publications: '45 publications',
        staff: '15 staff members'
    };
    
    // Update modal content with HOD data
    document.getElementById('profileName').textContent = hodData.name;
    document.getElementById('profileDepartment').textContent = hodData.department;
    document.getElementById('profileQualification').textContent = hodData.qualification;
    document.getElementById('profileEmail').textContent = hodData.email;
    document.getElementById('profilePhone').textContent = hodData.phone;
    document.getElementById('profileOffice').textContent = hodData.office;
    document.getElementById('profileExperience').textContent = hodData.experience;
    document.getElementById('profilePublications').textContent = hodData.publications;
    document.getElementById('profileStaff').textContent = hodData.staff;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    const modal = document.getElementById('viewProfileModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Performance Report Modal Functions
function openAddReportModal() {
    const modal = document.getElementById('addReportModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddReportModal() {
    const modal = document.getElementById('addReportModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle report form submission
const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            department: document.getElementById('department').value,
            period: document.getElementById('period').value,
            passRate: document.getElementById('passRate').value,
            avgGPA: document.getElementById('avgGPA').value,
            retentionRate: document.getElementById('retentionRate').value,
            comments: document.getElementById('comments').value,
            file: document.getElementById('reportFile').files[0]
        };
        
        console.log('Report Data:', formData);
        closeAddReportModal();
    });
}

// Settings Page Functions
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        console.log('Profile Data:', formData);
        // Here you would normally send the data to the server
    });
}

const securityForm = document.getElementById('securityForm');
if (securityForm) {
    securityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: document.getElementById('newPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };
        console.log('Security Data:', formData);
        // Here you would normally send the data to the server
    });
}

const notificationForm = document.getElementById('notificationForm');
if (notificationForm) {
    notificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            emailNotifications: notificationForm.querySelector('input[type="checkbox"]:nth-of-type(1)').checked,
            performanceReports: notificationForm.querySelector('input[type="checkbox"]:nth-of-type(2)').checked,
            departmentUpdates: notificationForm.querySelector('input[type="checkbox"]:nth-of-type(3)').checked
        };
        console.log('Notification Settings:', formData);
        // Here you would normally send the data to the server
    });
}

// Handle profile image upload
const profileImageInput = document.getElementById('profileImage');
if (profileImageInput) {
    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imagePreview = document.querySelector('.image-preview');
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Lecturer Navigation
const lecturerCoursesLink = document.querySelector('a[href="#"].nav-item:nth-child(2)');
if (lecturerCoursesLink && window.location.href.includes('lecturer-dashboard')) {
    lecturerCoursesLink.href = 'lecturer-courses.html';
}
const lecturerStudentsLink = document.querySelector('a[href="#"].nav-item:nth-child(3)');
if (lecturerStudentsLink && window.location.href.includes('lecturer-dashboard')) {
    lecturerCoursesLink.href = 'lecturer-students.html';
}
const lecturerMarksRecordLink = document.querySelector('a[href="#"].nav-item:nth-child(4)');
if (lecturerMarksRecordLink && window.location.href.includes('lecturer-dashboard')) {
    lecturerMarksRecordLink.href = 'lecturer-marks-records.html';
}
const lecturerReportsLink = document.querySelector('a[href="#"].nav-item:nth-child(5)');
if (lecturerReportsLink && window.location.href.includes('lecturer-dashboard')) {
    lecturerCoursesLink.href = 'lecturer-reports.html';
}

// hod Navigation
const hodLecturersLink = document.querySelector('a[href="#"].nav-item:nth-child(2)');
if (hodLecturersLink && window.location.href.includes('hod-dashboard')) {
    hodLecturersLink.href = 'hod-lecturers.html';
}
const hodStudentsLink = document.querySelector('a[href="#"].nav-item:nth-child(3)');
if (hodStudentsLink && window.location.href.includes('hod-dashboard')) {
    hodStudentsLink.href = 'hod-students.html';
}
const hodCoursesLink = document.querySelector('a[href="#"].nav-item:nth-child(4)');
if (hodCoursesLink && window.location.href.includes('hod-dashboard')) {
    hodCoursesLink.href = 'hod-courses.html';
}
const hodPerformanceLink = document.querySelector('a[href="#"].nav-item:nth-child(5)');
if (hodPerformanceLink && window.location.href.includes('hod-dashboard')) {
    hodPerformanceLink.href = 'hod-performance.html';
}
const hodReportsLink = document.querySelector('a[href="#"].nav-item:nth-child(6)');
if (hodReportsLink && window.location.href.includes('hod-dashboard')) {
    hodReportsLink.href = 'hod-reports.html';
}
const hodSettingsLink = document.querySelector('a[href="#"].nav-item:nth-child(7)');
if (hodSettingsLink && window.location.href.includes('hod-dashboard')) {
    hodSettingsLink.href = 'hod-settings.html';
}

// Update active navigation state for lecturer pages
const currentPage = window.location.pathname.split('/').pop();
if (currentPage.startsWith('lecturer-')) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    switch (currentPage) {
        case 'lecturer-dashboard.html':
            document.querySelector('.nav-item:nth-child(1)').classList.add('active');
            break;
        case 'lecturer-courses.html':
            document.querySelector('.nav-item:nth-child(2)').classList.add('active');
            break;
        // Add more cases for other lecturer pages
    }
}

// Bulk Marks Modal Functions
function openBulkMarksModal() {
    const modal = document.getElementById('bulkMarksModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBulkMarksModal() {
    const modal = document.getElementById('bulkMarksModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle bulk marks form submission
const bulkMarksForm = document.getElementById('bulkMarksForm');
if (bulkMarksForm) {
    bulkMarksForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            course: document.getElementById('courseSelect').value,
            level: document.getElementById('levelSelect').value,
            marks: []
        };
        
        // Collect marks from all rows
        const rows = document.querySelectorAll('.bulk-marks-table tbody tr');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input[type="number"]');
            formData.marks.push({
                regNumber: row.cells[0].textContent,
                studentName: row.cells[1].textContent,
                assignment: inputs[0].value,
                midTerm: inputs[1].value,
                final: inputs[2].value
            });
        });
        
        console.log('Bulk Marks Data:', formData);
        closeBulkMarksModal();
    });
}


//student navigations
const studentDashboardLink = document.querySelector('a[href="#"].nav-item:nth-child(1)');
if (studentDashboardLink && window.location.href.includes('student-dashboard')) {
    studentDashboardLink.href = 'student-dashboard.html';
}
const studentCoursesLink = document.querySelector('a[href="#"].nav-item:nth-child(2)');
if (studentCoursesLink && window.location.href.includes('student-dashboard')) {
    studentCoursesLink.href = 'student-courses.html';
}
const studentMarksLink = document.querySelector('a[href="#"].nav-item:nth-child(3)');
if (studentMarksLink && window.location.href.includes('student-dashboard')) {
    studentMarksLink.href = 'student-academic-progress.html';
}
const studentReportsLink = document.querySelector('a[href="#"].nav-item:nth-child(4)');
if (studentReportsLink && window.location.href.includes('student-dashboard')) {
    studentReportsLink.href = 'student-claims-history.html';
}
const studentSettingsLink = document.querySelector('a[href="#"].nav-item:nth-child(5)');
if (studentSettingsLink && window.location.href.includes('student-dashboard')) {
    studentSettingsLink.href = 'student-settings.html';
}


// Report Functions
function generateReport() {
    const courseSelect = document.getElementById('courseSelect');
    const levelSelect = document.getElementById('levelSelect');
    
    if (!courseSelect.value || !levelSelect.value) {
        alert('Please select both course and level');
        return;
    }
    
    // Here you would normally fetch the report data from the server
    // For now, we'll just show the preview
    document.querySelector('.report-preview').style.display = 'block';
}

function previewReport() {
    // Open report in a new tab for preview
    const reportContent = document.querySelector('.report-preview').cloneNode(true);
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Report Preview</title>');
    
    // Copy all stylesheets to the new window
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        newWindow.document.write(link.outerHTML);
    });
    
    newWindow.document.write('</head><body>');
    newWindow.document.write(reportContent.outerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
}

function printReport() {
    window.print();
}

function submitReport() {
    // Here you would normally send the report to the server
    const confirmation = confirm('Are you sure you want to submit this report to the HOD?');
    
    if (confirmation) {
        // Simulate submission
        alert('Report submitted successfully to HOD');
    }
}

// Calculate totals and statistics automatically
function calculateStatistics() {
    const rows = document.querySelectorAll('.report-table tbody tr');
    let totalStudents = rows.length;
    let passCount = 0;
    let totalScore = 0;
    
    rows.forEach(row => {
        const total = parseFloat(row.querySelector('td:nth-last-child(2)').textContent);
        totalScore += total;
        if (total >= 50) passCount++;
    });
    
    const passRate = (passCount / totalStudents * 100).toFixed(1);
    const averageScore = (totalScore / totalStudents).toFixed(1);
    
    // Update statistics
    document.querySelector('.stat-value:nth-child(1)').textContent = totalStudents;
    document.querySelector('.stat-value:nth-child(2)').textContent = passRate + '%';
    document.querySelector('.stat-value:nth-child(3)').textContent = averageScore;
}

// Call statistics calculation when report is generated
if (document.querySelector('.report-preview')) {
    calculateStatistics();
} 