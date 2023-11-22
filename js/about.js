async function getCV() {
  // Asynchronously load in the json data
  const cv_data = await fetch("js/cv.json");
  // If response from fetch request returns ok, run the rest
  if (cv_data.ok) {
    // Asynchronously convert response to JSON format
    const data = await cv_data.json();
    // A for loop for each section of the CV. Will iterate depending on amount of items inside each object. Will dynamically create the content and insert to hard-coded HTML wrappers depending on how many items there are in the JSON. If the amount of items changes in the JSON in the future, function should correctly extend the webpage with this new content with no need for changing any HTML.
    // General Skills
    const my_skills = document.getElementById("skills-progress");
    for (const item in data.skills_progress) {
      // Creating one element at a time and giving it classes, and content from the JSON. For readability. Appends last
      const p_tag = document.createElement("p");
      p_tag.textContent = capitalize(item);

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.skills_progress[item]}`);

      container_div.appendChild(progress_div);
      my_skills.appendChild(p_tag);
      my_skills.appendChild(container_div);
    }

    // Programming skills
    const my_programming = document.getElementById("programming-progress");
    for (const item in data.programming_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = item.toUpperCase();

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.programming_progress[item]}`);

      container_div.appendChild(progress_div);
      my_programming.appendChild(p_tag);
      my_programming.appendChild(container_div);
    }

    // Language Skills
    const my_languages = document.getElementById("languages-progress");
    for (const item in data.languages_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = capitalize(item);

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.languages_progress[item]}`);

      container_div.appendChild(progress_div);
      my_languages.appendChild(p_tag);
      my_languages.appendChild(container_div);
    }

    // Hobbies
    const my_hobbies = document.getElementById("hobbies");
    data.hobbies.forEach(function (hobby) {
      my_hobbies.innerHTML += `${capitalize(hobby)}<br>`;
    });

    // Profile
    const my_profile = document.getElementById("profile-text");
    my_profile.textContent = data.profile;

    // Work Experience
    const my_work_experiences = document.getElementById("work-experience");
    iteration_number = 0;
    for (const item in data.work_experience) {
      const h5_tag = document.createElement("h5");
      h5_tag.innerHTML = `${data.work_experience[item].title} @ <span class="orangered">${data.work_experience[item].company}</span>`;

      const dates_p_tag = document.createElement("p");
      dates_p_tag.classList.add("dates");
      dates_p_tag.textContent = data.work_experience[item].time;

      const description_p = document.createElement("p");
      description_p.textContent = data.work_experience[item].description;

      const hr_item = document.createElement("hr");

      my_work_experiences.appendChild(h5_tag);
      my_work_experiences.appendChild(dates_p_tag);
      my_work_experiences.appendChild(description_p);
      // I dont want a <hr> after last item
      if (iteration_number != data.work_experience.length - 1)
        my_work_experiences.appendChild(hr_item);
      iteration_number++;
    }

    // Education
    const my_education = document.getElementById("education");
    iteration_number = 0;
    for (const item in data.education) {
      const h5_tag = document.createElement("h5");
      h5_tag.innerHTML = `${data.education[item].title} @ <span class="orangered">${data.education[item].school}</span>`;

      const dates_p_tag = document.createElement("p");
      dates_p_tag.classList.add("dates");
      dates_p_tag.textContent = data.education[item].time;

      const description_p = document.createElement("p");
      description_p.textContent = data.education[item].description;

      my_education.appendChild(h5_tag);
      my_education.appendChild(dates_p_tag);
      my_education.appendChild(description_p);
    }
  }
  // After everything is loaded in, animate the progress bars
  change_progress();
}

// Take a string and return it with first char of every word capitalized
function capitalize(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

// AUTHOR: EXTERNAL
// LINK: https://codepen.io/theprogrammingexpert/pen/jOqGBLL
function change_progress() {
  // Get all bars with class progress
  const progress_bars = document.querySelectorAll(".progress");
  // For each bar found, run a personalized animation
  progress_bars.forEach(function (bar) {
    // Calculate how much 1% of this bars progress is. Fetch value from classlist
    const hundredth = Number(bar.classList[1]) / 100;
    // Run animation in 100 steps for smoothness
    for (let i = 1; i < 101; i++) {
      // Animate the bars in 100 increments and with 40ms delay between each
      setTimeout(() => change_progress(hundredth * i, bar), 40 * i);
    }
    // Arrowfunction to change the div width and % text on the bar. CSS handles transition
    const change_progress = (progress, my_bar) => {
      my_bar.style.width = `${progress}%`;
      my_bar.textContent = `${Math.round(progress)}%`;
    }
  })
}

getCV();