document.getElementById('scanBtn').addEventListener('click', function() {
    startScanner();
});

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container') // target element
        },
        decoder: {
            readers: ["code_128_reader"] // specify the barcode reader
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
        Quagga.onDetected(function(data) {
            const code = data.codeResult.code;
            Quagga.stop();
            fetchMedicineInfo(code);
        });
    });
}
// JavaScript remains unchanged from previous example
document.getElementById('scanBtn').addEventListener('click', function() {
    startScanner();
});

// Include the rest of the JavaScript logic..

function fetchMedicineInfo(barcode) {
    // Simulated fetch from a database
    const medicineData = {
        '1234567890123': {
            name: "Pain Relief",
            expiryDate: "2024-12-31",
            dosage: "1 tablet every 6 hours",
            sideEffects: "Nausea, Dizziness",
            usage: "Take with food."
        }
        // Add more medicines as needed
    };

    const medicine = medicineData[barcode];
    if (medicine) {
        displayMedicineInfo(medicine);
        checkExpiry(medicine.expiryDate);
    } else {
        alert("Medicine not found!");
    }
}

function displayMedicineInfo(medicine) {
    document.getElementById('medicine-name').textContent = medicine.name;
    document.getElementById('expiry-date').textContent = medicine.expiryDate;
    document.getElementById('dosage').textContent = medicine.dosage;
    document.getElementById('side-effects').textContent = medicine.sideEffects;
    document.getElementById('usage').textContent = medicine.usage;
    document.getElementById('medicine-info').classList.remove('hidden');
}

function checkExpiry(expiryDate) {
    const currentDate = new Date();
    const expDate = new Date(expiryDate);
    const timeDiff = expDate - currentDate; 

    if (timeDiff < 0) {
        alert("This medicine is expired!");
    } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
        alert("This medicine is nearing expiry!");
    } else {
        document.getElementById('alert-messages').textContent = "All medicines are in good condition.";
    }
}
