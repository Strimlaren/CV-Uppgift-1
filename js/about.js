async function getCV() {
  const cv_data = await fetch("js/cv.json");

  if (cv_data.ok) {
    const data = await cv_data.json();
  
    // General Skills
    const skills_progress = document.getElementById("skills-progress");
    for (const item in data.skills_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = capitalize(item);

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.style.width = `${data.skills_progress[item]}%`;
      progress_div.textContent = `${data.skills_progress[item]}%`;

      container_div.appendChild(progress_div);
      skills_progress.appendChild(p_tag);
      skills_progress.appendChild(container_div);
    }

    // Programming skills
    const programming_progress = document.getElementById(
      "programming-progress"
    );
    for (const item in data.programming_progress) {
      const p_tag = document.createElement("p");
      p_tag.textContent = item.toUpperCase();

      const container_div = document.createElement("div");
      container_div.classList.add("progress-bar-container");

      const progress_div = document.createElement("div");
      progress_div.classList.add("progress");
      progress_div.style.width = `${data.programming_progress[item]}%`;
      progress_div.textContent = `${data.programming_progress[item]}%`;

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
      progress_div.style.width = `${data.languages_progress[item]}%`;
      progress_div.textContent = `${data.languages_progress[item]}%`;

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
      // I dont want an <hr> after last item
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
}

getCV();

// Ta en sträng och gör om så att alla ords första bokstäver blir stora
function capitalize(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
