import { DEFAULT_CONTENT, getResumeContent } from './resume_data.js';

// --- Global Three.js Variables ---
let camera, scene, renderer;
let objects = [];

// --- Content and Storage Constants ---
// NOTE: RESUME_CONTENT_KEY is kept for use by the Control Panel's SAVE function, 
// but is no longer READ on page load.
const RESUME_CONTENT_KEY = 'resume_content_v2';
const PROFILE_IMAGE_KEY = 'resume_profile_image';

const PANEL_GAP = 1000;
const panels = [
    { id: "summary", element: "summary-panel", position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { id: "experience", element: "experience-panel", position: new THREE.Vector3(-PANEL_GAP, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { id: "skills", element: "skills-panel", position: new THREE.Vector3(-PANEL_GAP * 2, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
    { id: "education", element: "education-panel", position: new THREE.Vector3(-PANEL_GAP * 3, 0, 0), rotation: new THREE.Euler(0, 0, 0) },
];

let sceneTargetX = 0;
let isTransitioning = false;
const CAMERA_Z_CAROUSEL = 1200;
const CAMERA_Z_FOCUS = 800; 
let cameraTargetZ = CAMERA_Z_CAROUSEL; 

let currentContent = {};

// --- Content Loading and Rendering ---

/**
 * Loads content, ONLY calling the simulated API for content.
 * Edits from localStorage are now ignored on initial load/refresh.
 */
async function loadAndRenderContent() {
    // ALWAYS fetch default content from the simulated API (backend)
    currentContent = await getResumeContent();
    
    // Rerender all components with the fresh API data
    renderHeader(currentContent.header);
    renderSummary(currentContent.summary);
    renderExperience(currentContent.experience);
    renderSkills(currentContent.skills);
    renderEducation(currentContent.education);
    attachAccordionListeners();
}

function renderHeader(data) {
    document.getElementById('header-name').textContent = data.name;
    document.getElementById('header-title').textContent = data.title;
    document.getElementById('header-email').textContent = data.email;
    document.getElementById('header-phone').textContent = data.phone;
    
    document.getElementById('link-linkedin').href = data.links.linkedin;
    document.getElementById('link-github').href = data.links.github;
    document.getElementById('link-portfolio').href = data.links.portfolio;
}

function renderSummary(data) {
    document.getElementById('summary-text').textContent = data.text;
    const achievementsList = document.getElementById('summary-achievements');
    achievementsList.innerHTML = data.achievements.map(item => `<li>${item}</li>`).join('');
}

function renderExperience(entries) {
    const container = document.getElementById('experience-entries');
    container.innerHTML = entries.map(job => `
        <article class="job-entry mb-6 border rounded-lg transition duration-200 overflow-hidden shadow-md">
            <div class="job-header p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <div class="flex-grow">
                    <h3 class="text-xl font-semibold text-blue-800">${job.title}</h3>
                    <p class="text-base font-medium text-gray-600">${job.company} | ${job.location}</p>
                </div>
                <div class="text-right space-y-1 text-sm text-gray-500 min-w-[120px]">
                    <p class="mb-1">${job.years}</p>
                    <svg class="w-5 h-5 ml-auto mt-1 transform rotate-0 transition-transform duration-300 toggle-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div class="job-details hidden p-4 pt-0 border-t border-gray-200">
                <ul class="list-disc ml-6 mt-4 text-gray-700 space-y-2">
                    ${job.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
        </article>
    `).join('');
}

function renderSkills(skillCategories) {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = skillCategories.map((cat, index) => {
        const colors = [
            { bg: 'bg-blue-50', textBg: 'bg-blue-200', text: 'text-blue-900', header: 'text-blue-800' },
            { bg: 'bg-green-50', textBg: 'bg-green-200', text: 'text-green-900', header: 'text-green-800' },
            { bg: 'bg-purple-50', textBg: 'bg-purple-200', text: 'text-purple-900', header: 'text-purple-800' },
            { bg: 'bg-yellow-50', textBg: 'bg-yellow-200', text: 'text-yellow-900', header: 'text-yellow-800' },
        ];
        const color = colors[index % colors.length];

        return `
            <div class="p-4 border rounded-lg ${color.bg}">
                <h3 class="text-xl font-semibold mb-3 ${color.header}">${cat.category}</h3>
                <div class="flex flex-wrap gap-2">
                    ${cat.items.map(item => `
                        <span class="${color.textBg} ${color.text} px-3 py-1 rounded-full text-sm font-medium">${item}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderEducation(data) {
    const container = document.getElementById('education-entry');
    container.innerHTML = `
        <div class="flex justify-between items-start mb-1">
            <h3 class="text-xl font-semibold text-blue-800">${data.degree}</h3>
            <p class="text-sm font-medium text-gray-500">${data.years}</p>
        </div>
        <p class="text-lg font-medium text-gray-600 mb-2">${data.institution}</p>
        <p class="text-gray-700">${data.details}</p>
    `;
}

// Re-attaches click listeners after dynamically injecting content
function attachAccordionListeners() {
    const jobHeaders = document.querySelectorAll('.job-header');
    jobHeaders.forEach(header => {
        header.removeEventListener('click', toggleJobDetails); 
        header.addEventListener('click', toggleJobDetails);
    });
}

function toggleJobDetails(event) {
    const header = event.currentTarget;
    const entry = header.closest('.job-entry');
    const details = entry.querySelector('.job-details');
    const icon = entry.querySelector('.toggle-icon');

    details.classList.toggle('hidden');
    icon.classList.toggle('rotate-180', !details.classList.contains('hidden'));
}


// --- Control Panel/Backend Functions ---

window.openControlPanel = function(tabId = 'tab-header') {
    const modal = document.getElementById('control-panel-modal');
    modal.classList.remove('hidden');
    loadControlPanelData(currentContent);
    switchControlTab(tabId);
}

window.closeControlPanel = function(event) {
    if (event && event.target.id !== 'control-panel-modal' && event.target.id !== 'cancel-control-btn') return;
    document.getElementById('control-panel-modal').classList.add('hidden');
    document.getElementById('control-error').classList.add('hidden');
}

function loadControlPanelData(data) {
    // Header
    document.getElementById('edit-name').value = data.header.name;
    document.getElementById('edit-title').value = data.header.title;
    document.getElementById('edit-email').value = data.header.email;
    document.getElementById('edit-phone').value = data.header.phone;
    document.getElementById('edit-link-linkedin').value = data.header.links.linkedin;
    document.getElementById('edit-link-github').value = data.header.links.github;
    document.getElementById('edit-link-portfolio').value = data.header.links.portfolio;

    // Summary
    document.getElementById('edit-summary-text').value = data.summary.text;
    document.getElementById('edit-summary-achievements').value = data.summary.achievements.join('\n');

    // Experience (Dynamic Generation)
    renderExperienceEditor(data.experience);

    // Skills (Raw Text Conversion for easy editing)
    document.getElementById('edit-skills-raw').value = data.skills.map(cat => 
        `${cat.category}: ${cat.items.join(', ')}`
    ).join(' | ');

    // Education
    document.getElementById('edit-edu-degree').value = data.education.degree;
    document.getElementById('edit-edu-institution').value = data.education.institution;
    document.getElementById('edit-edu-years').value = data.education.years;
    document.getElementById('edit-edu-details').value = data.education.details;
}

function renderExperienceEditor(entries) {
    const container = document.getElementById('experience-editor-container');
    container.innerHTML = entries.map((job, index) => `
        <div id="job-${job.id}" class="job-edit-entry relative">
            <button onclick="removeJobEntry(${job.id})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
            <h5 class="font-bold mb-2">Job #${index + 1}</h5>
            <div class="grid grid-cols-2 gap-3">
                <input type="text" data-id="${job.id}" data-field="title" class="w-full p-1 border rounded text-sm" placeholder="Title" value="${job.title}">
                <input type="text" data-id="${job.id}" data-field="company" class="w-full p-1 border rounded text-sm" placeholder="Company" value="${job.company}">
                <input type="text" data-id="${job.id}" data-field="location" class="w-full p-1 border rounded text-sm" placeholder="Location" value="${job.location}">
                <input type="text" data-id="${job.id}" data-field="years" class="w-full p-1 border rounded text-sm" placeholder="Years" value="${job.years}">
            </div>
            <textarea data-id="${job.id}" data-field="details" rows="3" class="w-full p-1 border rounded mt-2 text-sm" placeholder="Responsibilities (One per line)">${job.details.join('\n')}</textarea>
        </div>
    `).join('');
}

window.addJobEntry = function() {
    // Use the current content's experience list to determine the highest ID
    const maxId = currentContent.experience.reduce((max, job) => Math.max(max, job.id), 0);
    const newId = maxId + 1;
    
    // Deep clone a default job entry or create a fresh structure
    const newJob = {
        id: newId,
        title: "New Job Entry",
        company: "New Company Name",
        location: "City, State",
        years: "Year - Year",
        details: ["Add your key responsibilities here (one per line)."]
    };

    currentContent.experience.push(newJob);
    renderExperienceEditor(currentContent.experience);
}

window.removeJobEntry = function(idToRemove) {
    currentContent.experience = currentContent.experience.filter(job => job.id !== idToRemove);
    renderExperienceEditor(currentContent.experience);
}

function switchControlTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
    document.querySelectorAll('.control-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.control-tab-btn[data-tab="${tabId}"]`).classList.add('active');
}
document.querySelectorAll('.control-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchControlTab(e.target.dataset.tab));
});

function parseSkillsRaw(rawText) {
    const categories = rawText.split(' | ').filter(s => s.trim() !== '');
    return categories.map(categoryString => {
        const [category, ...rest] = categoryString.split(':').map(s => s.trim());
        const itemsString = rest.join(':'); // Rejoin in case a category name had a colon
        
        if (!category || !itemsString) return null;
        
        const items = itemsString.split(',').map(item => item.trim()).filter(item => item !== '');
        return { category, items };
    }).filter(item => item !== null);
}

window.saveResumeContent = function() {
    const errorDisplay = document.getElementById('control-error');
    errorDisplay.classList.add('hidden');
    
    try {
        // 1. Header
        const newHeader = {
            name: document.getElementById('edit-name').value,
            title: document.getElementById('edit-title').value,
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            links: {
                linkedin: document.getElementById('edit-link-linkedin').value,
                github: document.getElementById('edit-link-github').value,
                portfolio: document.getElementById('edit-link-portfolio').value
            }
        };

        // 2. Summary
        const newSummary = {
            text: document.getElementById('edit-summary-text').value,
            achievements: document.getElementById('edit-summary-achievements').value.split('\n').map(line => line.trim()).filter(line => line !== '')
        };

        // 3. Experience (Re-parse dynamic fields)
        const jobElements = document.querySelectorAll('.job-edit-entry');
        const newExperience = [];
        jobElements.forEach(el => {
            const id = parseInt(el.id.replace('job-', ''));
            const jobData = { id: id, details: [] };

            el.querySelectorAll('input[data-field], textarea[data-field]').forEach(input => {
                const field = input.dataset.field;
                if (field === 'details') {
                    jobData[field] = input.value.split('\n').map(line => line.trim()).filter(line => line !== '');
                } else {
                    jobData[field] = input.value;
                }
            });
            newExperience.push(jobData);
        });

        // 4. Skills
        const rawSkills = document.getElementById('edit-skills-raw').value;
        const newSkills = parseSkillsRaw(rawSkills);
        // Only enforce strict parsing if user input something non-default
        if (rawSkills.trim() !== '' && newSkills.length === 0) {
            throw new Error("Skills format is incorrect. Use 'Category: Item1, Item2 | Category2: Item3...'.");
        }

        // 5. Education
        const newEducation = {
            degree: document.getElementById('edit-edu-degree').value,
            institution: document.getElementById('edit-edu-institution').value,
            years: document.getElementById('edit-edu-years').value,
            details: document.getElementById('edit-edu-details').value,
        };

        const newContent = {
            header: newHeader,
            summary: newSummary,
            experience: newExperience,
            skills: newSkills.length > 0 ? newSkills : [], // Use parsed skills, or empty array
            education: newEducation
        };

        // Update the live content object
        currentContent = newContent;
        
        // Save the *new* content to localStorage. This is now only used for the Control Panel to reopen 
        // with the current edits, but the main app ignores it on fresh load.
        localStorage.setItem(RESUME_CONTENT_KEY, JSON.stringify(newContent));
        
        closeControlPanel();
        loadAndRenderContent(); // Reload the entire resume view with the newly saved content
        
    } catch (error) {
        errorDisplay.textContent = `Save Error: ${error.message}`;
        errorDisplay.classList.remove('hidden');
    }
}


// --- Three.js Core and Navigation ---
// (Functions largely unchanged, kept global via window. for event handlers in HTML)

function init() {
  const container = document.getElementById("container");
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
  camera.position.set(0, 0, cameraTargetZ);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  panels.forEach((p) => {
    const element = document.getElementById(p.element);
    const object = new THREE.CSS3DObject(element);
    object.position.copy(p.position);
    object.rotation.copy(p.rotation);
    scene.add(object);
    objects.push(object);
  });

  scene.position.x = sceneTargetX;

  window.addEventListener("resize", onWindowResize);
  updateFocusButtonVisibility();
  updateArrowButtonVisibility();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  camera.position.z += (cameraTargetZ - camera.position.z) * 0.05;

  const delta = sceneTargetX - scene.position.x;
  let wasTransitioning = isTransitioning;

  if (Math.abs(delta) > 0.1) {
    scene.position.x += delta * 0.05;
    isTransitioning = true;
    
    if (!wasTransitioning) {
        document.getElementById('left-nav-arrow').classList.add('hidden-ui');
        document.getElementById('right-nav-arrow').classList.add('hidden-ui');
    }

  } else {
    scene.position.x = sceneTargetX;
    isTransitioning = false;
    
    if (wasTransitioning) {
      updateArrowButtonVisibility(); 
    }
  }

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.render(scene, camera);
}

function updateFocusButtonVisibility() {
  const exitFocusBtn = document.getElementById("exit-focus-btn");
  if (cameraTargetZ === CAMERA_Z_FOCUS) {
    exitFocusBtn.classList.remove("hidden");
  } else {
    exitFocusBtn.classList.add("hidden");
  }
}

function updateArrowButtonVisibility() {
    const currentIndex = Math.round(sceneTargetX / PANEL_GAP);
    const leftArrow = document.getElementById('left-nav-arrow');
    const rightArrow = document.getElementById('right-nav-arrow');
    
    if (cameraTargetZ === CAMERA_Z_CAROUSEL || isTransitioning) {
        leftArrow.classList.add('hidden-ui');
        rightArrow.classList.add('hidden-ui');
        return;
    }

    if (currentIndex === 0) {
        rightArrow.classList.add('hidden-ui');
    } else {
        rightArrow.classList.remove('hidden-ui');
    }
    
    if (currentIndex === panels.length - 1) {
        leftArrow.classList.add('hidden-ui');
    } else {
        leftArrow.classList.remove('hidden-ui');
    }
}

window.toggleFocus = function () {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const button = document.getElementById("focus-toggle");

    if (cameraTargetZ === CAMERA_Z_CAROUSEL) {
      cameraTargetZ = CAMERA_Z_FOCUS;
      header.classList.add("hidden-ui");
      nav.classList.add("hidden-ui");
      button.textContent = "Carousel View";
      button.classList.add("bg-green-600", "hover:bg-green-700");
      button.classList.remove("bg-blue-600", "hover:bg-blue-700");
    } else {
      cameraTargetZ = CAMERA_Z_CAROUSEL;
      header.classList.remove("hidden-ui");
      nav.classList.remove("hidden-ui");
      button.textContent = "Focus View";
      button.classList.add("bg-blue-600", "hover:bg-blue-700");
      button.classList.remove("bg-green-600", "hover:bg-green-700");
    }
    updateFocusButtonVisibility();
    updateArrowButtonVisibility();
};

window.flyToPanel = function (panelId) {
    const targetPanelIndex = panels.findIndex((p) => p.id === panelId);

    if (targetPanelIndex !== -1) {
      sceneTargetX = PANEL_GAP * targetPanelIndex;

      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelector(
          `.tab-button[data-target="${panels[targetPanelIndex].element}"]`
        )
        .classList.add("active");
    }
    return targetPanelIndex;
};

window.navigatePanel = function(direction) {
    if (isTransitioning) return; 
    
    const currentIndex = Math.round(sceneTargetX / PANEL_GAP); 
    let nextIndex;
    
    if (direction === 1) { 
        nextIndex = Math.max(currentIndex - 1, 0);
    } else if (direction === -1) { 
        nextIndex = Math.min(currentIndex + 1, panels.length - 1);
    } else {
        return;
    }

    if (nextIndex !== currentIndex) {
        const targetPanelId = panels[nextIndex].id;
        flyToPanel(targetPanelId);
    }
}

function handleKeydown(event) {
  if (
    !document.getElementById("image-modal").classList.contains("hidden") ||
    !document.getElementById("control-panel-modal").classList.contains("hidden")
  ) {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault(); 
    navigatePanel(1); 
  } else if (event.key === "ArrowLeft") {
    event.preventDefault(); 
    navigatePanel(-1); 
  } else if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    toggleFocus();
    return;
  }
}

// --- Image Upload Logic (Unchanged) ---
window.updateImageSource = function(source) {
    const imgElement = document.getElementById("profile-img");
    const defaultPlaceholder = "https://placehold.co/80x80/4b5563/ffffff?text=AJ";
    if (source) {
        imgElement.src = source;
        imgElement.onerror = () => {
            imgElement.src = defaultPlaceholder;
            console.error("Failed to load image source. Reverting to placeholder.");
        };
    } else {
        imgElement.src = defaultPlaceholder;
    }
}

function loadProfileImage() {
    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
    if (savedImage) {
        window.updateImageSource(savedImage);
    }
}

window.openImageModal = function () {
    document.getElementById("image-modal").classList.remove("hidden");
    document.getElementById("image-error").classList.add("hidden");
};

window.closeImageModal = function (event) {
    if (
        event &&
        event.target.id !== "image-modal" &&
        event.target.id !== "cancel-btn"
    )
        return;
    document.getElementById("image-url").value = "";
    document.getElementById("image-file").value = "";
    document.getElementById("image-error").classList.add("hidden");
    document.getElementById("image-modal").classList.add("hidden");
};

window.saveProfileImage = function () {
    const urlInput = document.getElementById("image-url").value.trim();
    const fileInput = document.getElementById("image-file");
    const errorDisplay = document.getElementById("image-error");
    errorDisplay.classList.add("hidden");

    if (!urlInput && fileInput.files.length === 0) {
        localStorage.removeItem(PROFILE_IMAGE_KEY);
        window.updateImageSource(null);
        window.closeImageModal();
        return;
    }

    if (urlInput) {
        if (!urlInput.startsWith("http")) {
            errorDisplay.textContent =
                "Please enter a valid URL (must start with http/https).";
            errorDisplay.classList.remove("hidden");
            return;
        }

        const tempImg = new Image();

        tempImg.onload = () => {
            localStorage.setItem(PROFILE_IMAGE_KEY, urlInput);
            window.updateImageSource(urlInput);
            window.closeImageModal();
        };

        tempImg.onerror = () => {
            errorDisplay.textContent =
                "Error: The image link is invalid or cannot be loaded due to security restrictions. Please ensure it is a direct, publicly accessible image file.";
            errorDisplay.classList.remove("hidden");
        };

        tempImg.src = urlInput;
    } else if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const MAX_FILE_SIZE = 2 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            errorDisplay.textContent = "File size exceeds 2MB limit.";
            errorDisplay.classList.remove("hidden");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newSource = reader.result;
            localStorage.setItem(PROFILE_IMAGE_KEY, newSource);
            window.updateImageSource(newSource);
            window.closeImageModal();
        };
        reader.onerror = () => {
            errorDisplay.textContent = "Error reading file.";
            errorDisplay.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    } else {
        errorDisplay.textContent =
            "Please enter an image URL or upload a file.";
        errorDisplay.classList.remove("hidden");
    }
};


// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  init();
  animate();
  loadProfileImage();
  loadAndRenderContent(); // Load content directly from the API default

  window.addEventListener("keydown", handleKeydown);
});