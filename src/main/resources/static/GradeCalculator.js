document.addEventListener('DOMContentLoaded', function() {
    const addRowButton = document.getElementById('addRow');
    const activitiesTable = document.getElementById('activitiesTable');
    const weightedButton = document.getElementById('weighted');
    const meanButton = document.getElementById('mean');
    const resultText = document.getElementById('resultText');

    addRowButton.addEventListener('click', addRow);
    weightedButton.addEventListener('click', calculateWeighted);
    meanButton.addEventListener('click', calculateMean);

    activitiesTable.addEventListener('input', updatePercent);

    function addRow() {
        const rowCount = activitiesTable.rows.length + 1;
        const newRow = activitiesTable.insertRow();
        newRow.innerHTML = `
            <td>Activity ${rowCount}</td>
            <td>A${rowCount}</td>
            <td><input type="number" name="weight" class="weight" /></td>
            <td><input type="number" name="grade" class="grade" /> / <input type="number" name="maxGrade" class="maxGrade" /></td>
            <td><span class="percent">0%</span></td>
        `;
    }

    function updatePercent() {
        const rows = activitiesTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const gradeInput = rows[i].querySelector('.grade');
            const maxGradeInput = rows[i].querySelector('.maxGrade');
            const percentSpan = rows[i].querySelector('.percent');
            
            const grade = parseFloat(gradeInput.value);
            const maxGrade = parseFloat(maxGradeInput.value);
            
            if (!isNaN(grade) && !isNaN(maxGrade) && maxGrade !== 0) {
                const percent = (grade / maxGrade) * 100;
                percentSpan.textContent = percent.toFixed(2) + '%';
            } else {
                percentSpan.textContent = '0%';
            }
        }
    }

    function calculateWeighted() {
        let totalWeightedScore = 0;
        let totalWeight = 0;

        const rows = activitiesTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const gradeInput = rows[i].querySelector('.grade');
            const maxGradeInput = rows[i].querySelector('.maxGrade');
            const weightInput = rows[i].querySelector('.weight');
            
            const grade = parseFloat(gradeInput.value);
            const maxGrade = parseFloat(maxGradeInput.value);
            const weight = parseFloat(weightInput.value);
            
            if (!isNaN(grade) && !isNaN(maxGrade) && !isNaN(weight) && maxGrade !== 0) {
                const percent = grade / maxGrade;
                totalWeightedScore += percent * weight;
                totalWeight += weight;
            }
        }

        if (totalWeight > 0) {
            const weightedAverage = (totalWeightedScore / totalWeight) * 100;
            resultText.textContent = `Weighted Average: ${weightedAverage.toFixed(2)}%`;
        } else {
            resultText.textContent = 'Weighted Average: 0%';
        }
    }

    function calculateMean() {
        let totalPercent = 0;
        let count = 0;

        const rows = activitiesTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const gradeInput = rows[i].querySelector('.grade');
            const maxGradeInput = rows[i].querySelector('.maxGrade');
            
            const grade = parseFloat(gradeInput.value);
            const maxGrade = parseFloat(maxGradeInput.value);
            
            if (!isNaN(grade) && !isNaN(maxGrade) && maxGrade !== 0) {
                const percent = grade / maxGrade;
                totalPercent += percent;
                count++;
            }
        }

        if (count > 0) {
            const mean = (totalPercent / count) * 100;
            resultText.textContent = `Mean Average: ${mean.toFixed(2)}%`;
        } else {
            resultText.textContent = 'Mean Average: 0%';
        }
    }
});
