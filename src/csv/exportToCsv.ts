export function exportToCsv(data: {}[]) {
    // Convertir les données en CSV
    let csvContent = '';
    data.forEach((row, index) => {
        csvContent += Object.values(row).join(';') + '\n';
    });

    // Créer un blob à partir du contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un lien de téléchargement
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}