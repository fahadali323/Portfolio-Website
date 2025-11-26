// --- Global Three.js Variables ---
let camera, scene, renderer;
let objects = [];

const PANEL_GAP = 1000;
const panels = [
    // Panel positions are sequential along the negative X-axis
    {
      id: "summary",
      element: "summary-panel",
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    {
      id: "experience",
      element: "experience-panel",
      position: new THREE.Vector3(-PANEL_GAP, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    {
      id: "skills",
      element: "skills-panel",
      position: new THREE.Vector3(-PANEL_GAP * 2, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    {
      id: "education",
      element: "education-panel",
      position: new THREE.Vector3(-PANEL_GAP * 3, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
];

let sceneTargetX = 0;
let isTransitioning = false;

// CAMERA Z TARGETS
const CAMERA_Z_CAROUSEL = 1200;
const CAMERA_Z_FOCUS = 800; // Closer Z position for focus view
let cameraTargetZ = CAMERA_Z_CAROUSEL; // Initial target Z for the camera

// --- Core Functions ---

function init() {
  const container = document.getElementById("container");
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Camera setup: Fixed position on X/Y, but Z will be interpolated
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
  // Use the variable for initial position
  camera.position.set(0, 0, cameraTargetZ);

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);

  // Renderer setup (for CSS content)
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Create 3D CSS objects (positioned horizontally)
  panels.forEach((p) => {
    const element = document.getElementById(p.element);
    const object = new THREE.CSS3DObject(element);
    object.position.copy(p.position);
    object.rotation.copy(p.rotation);
    scene.add(object);
    objects.push(object);
  });

  // Ensure the scene starts at the first panel's focus position
  scene.position.x = sceneTargetX;

  window.addEventListener("resize", onWindowResize);

  // Set initial state for the focus/arrow buttons
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

  // Smooth camera Z movement (zoom/focus toggle)
  camera.position.z += (cameraTargetZ - camera.position.z) * 0.05;

  // Smoothly move the entire scene's X position to the target
  const delta = sceneTargetX - scene.position.x;
  let wasTransitioning = isTransitioning;

  if (Math.abs(delta) > 0.1) {
    scene.position.x += delta * 0.05; // Lerp the scene position
    isTransitioning = true;
    
    // Hide arrows immediately when movement starts
    if (!wasTransitioning) {
        document.getElementById('left-nav-arrow').classList.add('hidden-ui');
        document.getElementById('right-nav-arrow').classList.add('hidden-ui');
    }

  } else {
    // Once transition is almost complete, snap to the exact position
    scene.position.x = sceneTargetX;
    isTransitioning = false;
    
    // If it just stopped transitioning, update arrow visibility
    if (wasTransitioning) {
      updateArrowButtonVisibility(); 
    }
  }

  // Camera stays focused on the origin
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);
}

// Helper to manage the visibility of the fixed Exit Focus button
function updateFocusButtonVisibility() {
  const exitFocusBtn = document.getElementById("exit-focus-btn");
  if (cameraTargetZ === CAMERA_Z_FOCUS) {
    exitFocusBtn.classList.remove("hidden");
  } else {
    exitFocusBtn.classList.add("hidden");
  }
}

// Helper to manage visibility/disabling of side navigation arrows
function updateArrowButtonVisibility() {
    const currentIndex = Math.round(sceneTargetX / PANEL_GAP);
    const leftArrow = document.getElementById('left-nav-arrow');
    const rightArrow = document.getElementById('right-nav-arrow');
    
    // Hide arrows during Carousel Mode or during transition
    if (cameraTargetZ === CAMERA_Z_CAROUSEL || isTransitioning) {
        leftArrow.classList.add('hidden-ui');
        rightArrow.classList.add('hidden-ui');
        return;
    }

    // Right Arrow (Direction 1): Moves to the RIGHT (index decreases, e.g., 1 -> 0). Hidden at Index 0.
    if (currentIndex === 0) {
        rightArrow.classList.add('hidden-ui');
    } else {
        rightArrow.classList.remove('hidden-ui');
    }
    
    // Left Arrow (Direction -1): Moves to the LEFT (index increases, e.g., 0 -> 1). Hidden at Index 3.
    if (currentIndex === panels.length - 1) {
        leftArrow.classList.add('hidden-ui');
    } else {
        leftArrow.classList.remove('hidden-ui');
    }
}


// FOCUS TOGGLE FUNCTION
window.toggleFocus = function () {
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const button = document.getElementById("focus-toggle");

  if (cameraTargetZ === CAMERA_Z_CAROUSEL) {
    // Switch to Focus mode (Zoom in and Hide UI)
    cameraTargetZ = CAMERA_Z_FOCUS;
    header.classList.add("hidden-ui");
    nav.classList.add("hidden-ui");
    button.textContent = "Carousel View";
    button.classList.add("bg-green-600", "hover:bg-green-700");
    button.classList.remove("bg-blue-600", "hover:bg-blue-700");
  } else {
    // Switch to Carousel mode (Zoom out and Show UI)
    cameraTargetZ = CAMERA_Z_CAROUSEL;
    header.classList.remove("hidden-ui");
    nav.classList.remove("hidden-ui");
    button.textContent = "Focus View";
    button.classList.add("bg-blue-600", "hover:bg-blue-700");
    button.classList.remove("bg-green-600", "hover:bg-green-700");
  }
  // Update the visibility of the new fixed exit button and arrows
  updateFocusButtonVisibility();
  updateArrowButtonVisibility();
};

// Moves the scene to center the target panel
window.flyToPanel = function (panelId) {
  // Find the target panel data
  const targetPanelIndex = panels.findIndex((p) => p.id === panelId);

  if (targetPanelIndex !== -1) {
    // The required scene position is the inverse of the panel's offset (to center it).
    sceneTargetX = PANEL_GAP * targetPanelIndex;

    // Update active navigation button
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

// Function to navigate using +/- direction (used by both buttons and keyboard)
window.navigatePanel = function(direction) {
    if (isTransitioning) return; // Prevent rapid movement
    
    // Use sceneTargetX for index calculation
    const currentIndex = Math.round(sceneTargetX / PANEL_GAP); 
    let nextIndex;
    
    // REVERSED LOGIC: Right button (dir=1) decreases index. Left button (dir=-1) increases index.
    if (direction === 1) { // Right button/ArrowRight: Moves toward VISUAL RIGHT (index decreases)
        nextIndex = Math.max(currentIndex - 1, 0);
    } else if (direction === -1) { // Left button/ArrowLeft: Moves toward VISUAL LEFT (index increases)
        nextIndex = Math.min(currentIndex + 1, panels.length - 1);
    } else {
        return;
    }

    if (nextIndex !== currentIndex) {
        const targetPanelId = panels[nextIndex].id;
        flyToPanel(targetPanelId);
    }
}


// Keydown Handler for Arrow Navigation
function handleKeydown(event) {
  // Ignore key presses if a modal is open
  if (
    !document.getElementById("image-modal").classList.contains("hidden")
  ) {
    return;
  }

  // We use the navigatePanel helper function which now contains the reversed logic
  if (event.key === "ArrowRight") {
    event.preventDefault(); 
    navigatePanel(1); // 1 = Right Button/Arrow direction
  } else if (event.key === "ArrowLeft") {
    event.preventDefault(); 
    navigatePanel(-1); // -1 = Left Button/Arrow direction
  } else if (event.key === "f" || event.key === "F") {
    // Optional: Toggle Focus view using 'F' key
    event.preventDefault();
    toggleFocus();
    return;
  }
}

// --- Interaction Logic (Image & Accordion) ---

const PROFILE_IMAGE_KEY = "resume_profile_image";

function updateImageSource(source) {
  const imgElement = document.getElementById("profile-img");
  const defaultPlaceholder =
    "https://placehold.co/80x80/4b5563/ffffff?text=AJ";

  if (source) {
    imgElement.src = source;
    imgElement.onerror = () => {
      imgElement.src = defaultPlaceholder;
      console.error(
        "Failed to load image source. Reverting to placeholder."
      );
    };
  } else {
    imgElement.src = defaultPlaceholder;
  }
}

function loadProfileImage() {
  const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
  if (savedImage) {
    updateImageSource(savedImage);
  }
}

window.openImageModal = function () {
  document.getElementById("image-modal").classList.remove("hidden");
  document.getElementById("image-error").classList.add("hidden");
};

window.closeImageModal = function (event) {
  // Only close if the click was on the modal background or the cancel button
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
    updateImageSource(null);
    closeImageModal();
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
      updateImageSource(urlInput);
      closeImageModal();
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
      updateImageSource(newSource);
      closeImageModal();
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

document.addEventListener("DOMContentLoaded", () => {
  init();
  animate();
  loadProfileImage();

  // Add Keydown listener for navigation
  window.addEventListener("keydown", handleKeydown);

  // Accordion/Dropdown Logic for Experience Section (must run after panels are in DOM)
  const jobHeaders = document.querySelectorAll(".job-header");
  jobHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const entry = header.closest(".job-entry");
      const details = entry.querySelector(".job-details");
      const icon = entry.querySelector(".toggle-icon");

      // Toggle visibility (using hidden class)
      details.classList.toggle("hidden");

      // Toggle icon rotation
      if (details.classList.contains("hidden")) {
        icon.classList.remove("rotate-180");
      } else {
        icon.classList.add("rotate-180");
      }
    });
  });
});