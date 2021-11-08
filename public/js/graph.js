const ctx = document.getElementById('leGraphique');       // Permet de choper le graphique. On l'utilise pour indiquer où doit être affiché le graphique
const notes = ["F", "D", "C", "B", "A", "S"];            // On utilise notes comme labels de notre graphique
const countNotes = document.getElementById("countNotes").innerHTML;   //CountNotes récupère le nmbre d'occurences de chaque note dans pour l'objectif donné

const data = {
  labels: notes,
  datasets: [{
      label: 'Objectif',
      data: countNotes,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(175, 188, 63)',
        'rgb(21, 150, 166)'
      ],
      hoverOffset: 5
    }]
};


const config = {
type: 'pie',
data: data,
options: {}
};

const myChart = new Chart(
  ctx,
  config
);