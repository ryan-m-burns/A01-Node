document.addEventListener('DOMContentLoaded', function () {
  const addTechButton = document.querySelector('.add-tech');
  const techStackDiv = document.querySelector('.tech-stack');

  addTechButton.addEventListener('click', function () {
    const newTechDiv = document.createElement('div');
    newTechDiv.innerHTML = `<input type='text' name='tech' required /> <button type='button' class='remove-tech'>-</button>`;
    techStackDiv.appendChild(newTechDiv);
  });

  techStackDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-tech')) {
      e.target.parentElement.remove();
    }
  });
});
