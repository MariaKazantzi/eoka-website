let currentYear = 1955;
let currentMonth = 0;
const minYear = 1955;
const maxYear = 1959;

const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const monthNamesEl = [
    'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
    'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
];

const eventsEn = {
    '1955-01-01': 'New Year 1955 - EOKA organization begins planning',
    '1955-04-01': 'EOKA campaign officially launches',
    '1955-06-15': 'First major EOKA operation',
    '1955-08-09': 'British Governor John Harding arrives in Cyprus',
    '1955-09-01': 'Emergency declared in Cyprus',
    '1956-03-17': 'Makarios III deported to Seychelles',
    '1956-05-20': 'Major operation by EOKA forces',
    '1956-08-12': 'British military reinforcements arrive',
    '1957-01-10': 'EOKA intensifies armed struggle',
    '1957-06-01': 'Peace negotiations begin',
    '1957-12-19': 'Makarios released from detention',
    '1958-02-24': 'Radcliffe Plan rejected',
    '1958-06-04': 'Turkish counter-insurgency operations intensify',
    '1958-09-12': 'Turkish Cypriot TMT organization formed',
    '1958-12-15': 'UN involvement in Cyprus crisis',
    '1959-02-19': 'Zurich and London agreements signed',
    '1959-04-01': 'Cyprus gains independence',
    '1959-08-16': 'Archbishop Makarios becomes President'
};

const eventsEl = {
    '1955-01-01': 'Πρωτοχρονιά 1955 - Ξεκινά η οργάνωση της Ε.Ο.Κ.Α',
    '1955-04-01': 'Επίσημη έναρξη της καμπάνιας της Ε.Ο.Κ.Α',
    '1955-06-15': 'Πρώτη μεγάλη επιχείρηση της Ε.Ο.Κ.Α',
    '1955-08-09': 'Ο Βρετανός Κυβερνήτης John Harding φθάνει στην Κύπρο',
    '1955-09-01': 'Ανακοίνωση κατάστασης ανάγκης στην Κύπρο',
    '1956-03-17': 'Εξορία του Μακαρίου III στα Σεϋχέλλες',
    '1956-05-20': 'Μεγάλη επιχείρηση των δυνάμεων της Ε.Ο.Κ.Α',
    '1956-08-12': 'Άφιξη βρετανικών στρατιωτικών ενισχύσεων',
    '1957-01-10': 'Η Ε.Ο.Κ.Α εντείνει τον ένοπλο αγώνα',
    '1957-06-01': 'Έναρξη διαπραγματεύσεων για ειρήνη',
    '1957-12-19': 'Απελευθέρωση του Μακαρίου από τη κράτηση',
    '1958-02-24': 'Απόρριψη του Σχεδίου Radcliffe',
    '1958-06-04': 'Εντείνονται οι βρετανικές εναντίον-αντάρτικες επιχειρήσεις',
    '1958-09-12': 'Σχηματισμός της οργάνωσης TMT των Τουρκοκυπρίων',
    '1958-12-15': 'Εμπλοκή του ΟΗΕ στο Κυπριακό',
    '1959-02-19': 'Υπογραφή των Συμφωνιών Zurich και Λονδίνου',
    '1959-04-01': 'Η Κύπρος αποκτά ανεξαρτησία',
    '1959-08-16': 'Ο Αρχιεπίσκοπος Μακάριος καθίσταται Πρόεδρος'
};

// Set language BEFORE DOMContentLoaded from localStorage
const savedLang = localStorage.getItem('language') || 'el';
let monthNames = savedLang === 'en' ? monthNamesEn : monthNamesEl;
let events = savedLang === 'en' ? eventsEn : eventsEl;

document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
});

function initializeCalendar() {
    const monthSelector = document.getElementById('monthSelector');
    const yearSelector = document.getElementById('yearSelector');

    // Populate month selector
    monthNames.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = name;
        monthSelector.appendChild(option);
    });
    monthSelector.value = currentMonth;

    // Populate year selector
    for (let year = minYear; year <= maxYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelector.appendChild(option);
    }
    yearSelector.value = currentYear;

    // Attach event listeners
    monthSelector.addEventListener('change', function() {
        currentMonth = parseInt(this.value);
        render();
    });

    yearSelector.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        render();
    });

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentMonth > 0) {
            currentMonth--;
        } else if (currentYear > minYear) {
            currentYear--;
            currentMonth = 11;
        }
        monthSelector.value = currentMonth;
        yearSelector.value = currentYear;
        render();
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentMonth < 11) {
            currentMonth++;
        } else if (currentYear < maxYear) {
            currentYear++;
            currentMonth = 0;
        }
        monthSelector.value = currentMonth;
        yearSelector.value = currentYear;
        render();
    });

    // Handle language changes
    window.addEventListener('languageChanged', function() {
        const currentLang = localStorage.getItem('language') || 'el';
        monthNames = currentLang === 'el' ? monthNamesEl : monthNamesEn;
        events = currentLang === 'el' ? eventsEl : eventsEn;
        
        // Update button values
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (currentLang === 'en') {
            prevBtn.textContent = '← Previous';
            nextBtn.textContent = 'Next →';
        } else {
            prevBtn.textContent = '← Προηγούμενο';
            nextBtn.textContent = 'Επόμενο →';
        }
        
        // Update month selector options with correct language
        const currentMonthValue = monthSelector.value;
        monthSelector.innerHTML = '';
        monthNames.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            monthSelector.appendChild(option);
        });
        monthSelector.value = currentMonthValue;
        
        render();
    });

    // Initial render
    render();
}

function getEventForDate(year, month, day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[dateStr];
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function generateMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = monthNames[month];

    let html = `<div class="month">
        <h3>${monthName} ${year}</h3>
        <table class="calendar-table">
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>`;

    let rows = 0;
    html += '<tr>';

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        html += '<td class="empty"></td>';
        rows++;
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        if (rows === 7) {
            html += '</tr><tr>';
            rows = 0;
        }
        const eventText = getEventForDate(year, month, day);
        const eventAttr = eventText ? ` data-event="${eventText.replace(/"/g, '&quot;')}"` : '';
        html += `<td${eventAttr}>${day}</td>`;
        rows++;
    }

    // Empty cells after month ends
    while (rows > 0 && rows < 7) {
        html += '<td class="empty"></td>';
        rows++;
    }

    html += '</tr></tbody></table></div>';
    return html;
}

function render() {
    document.getElementById('calendarGrid').innerHTML = generateMonth(currentYear, currentMonth);
    attachEventListeners();
}

function attachEventListeners() {
    const cells = document.querySelectorAll('.calendar-table td[data-event]');
    let tooltip = document.getElementById('eventTooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'eventTooltip';
        tooltip.className = 'event-tooltip';
        document.body.appendChild(tooltip);
    }

    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            const event = this.getAttribute('data-event');
            tooltip.textContent = event;
            tooltip.classList.add('active');
        });

        cell.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.pageX + 10) + 'px';
            tooltip.style.top = (e.pageY + 10) + 'px';
        });

        cell.addEventListener('mouseleave', function() {
            tooltip.classList.remove('active');
        });
    });
}
