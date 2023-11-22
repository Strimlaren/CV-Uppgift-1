async function getCV() {
  // Asynchronously load in the json data
  const cv_data = await fetch("js/cv.json");
  // If response from fetch request returns ok, run the rest
  if (cv_data.ok) {
    // Asynchronously convert response to JSON format
    const data = await cv_data.json();
    // A for loop for each section of the CV. Will iterate depending on amount of items inside each object. Will dynamically create the content and insert to hard-coded HTML wrappers depending on how many items there are in the JSON. If the amount of items changes in the JSON in the future, function should correctly extend the webpage with this new content with no need for changing any HTML.
    // General Skills
    const skills_progress = document.getElementById("skills-progress");
    for (const item in data.skills_progress) {
      // Creating one element at a time and giving it classes, and content from the JSON. For readability, appends last
      const p_tag = document.createElement("p");
      p_tag.textContent = capitalize(item);

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.skills_progress[item]}`); // DO I NEED THIS ???

      container_div.appendChild(progress_div);
      skills_progress.appendChild(p_tag);
      skills_progress.appendChild(container_div);
    }

    // Programming skills
    const programming_progress = document.getElementById("programming-progress");
    for (const item in data.programming_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = item.toUpperCase();

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.programming_progress[item]}`);

      container_div.appendChild(progress_div);
      programming_progress.appendChild(p_tag);
      programming_progress.appendChild(container_div);
    }

    // Language Skills
    const languages_progress = document.getElementById("languages-progress");
    for (const item in data.languages_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = capitalize(item);

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.classList.add(`${data.languages_progress[item]}`);

      container_div.appendChild(progress_div);
      languages_progress.appendChild(p_tag);
      languages_progress.appendChild(container_div);
    }

    // Hobbies
    const hobbies = document.getElementById("hobbies");
    data.hobbies.forEach(function (hobby) {
      hobbies.innerHTML += `${capitalize(hobby)}<br>`;
    });

    // Profile
    const profile = document.getElementById("profile-text");
    profile.textContent = data.profile;

    // Work Experience
    const work_experiences = document.getElementById("work-experience");
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

      work_experiences.appendChild(h5_tag);
      work_experiences.appendChild(dates_p_tag);
      work_experiences.appendChild(description_p);
      // I dont want a <hr> after last item
      if (iteration_number != data.work_experience.length - 1)
        work_experiences.appendChild(hr_item);
      iteration_number++;
    }

    // Education
    const education = document.getElementById("education");
    iteration_number = 0;
    for (const item in data.education) {
      const h5_tag = document.createElement("h5");
      h5_tag.innerHTML = `${data.education[item].title} @ <span class="orangered">${data.education[item].school}</span>`;

      const dates_p_tag = document.createElement("p");
      dates_p_tag.classList.add("dates");
      dates_p_tag.textContent = data.education[item].time;

      const description_p = document.createElement("p");
      description_p.textContent = data.education[item].description;

      education.appendChild(h5_tag);
      education.appendChild(dates_p_tag);
      education.appendChild(description_p);
    }
  }
  change_progress();
}

getCV();

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

  const progress_bars = document.querySelectorAll(".progress");

  progress_bars.forEach(function (bar) {
    const hundredth = Number(bar.classList[1]) / 100;

    for (let i = 1; i < 101; i++) {
      setTimeout(() => change_progress(hundredth * i, bar), 40 * i);
    }

    const change_progress = (progress, my_bar) => {
      my_bar.style.width = `${progress}%`;
      my_bar.textContent = `${Math.round(progress)}%`;
    }
  })
}