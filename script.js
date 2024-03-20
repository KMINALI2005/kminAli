document.addEventListener("DOMContentLoaded", function() {
    const invoicesTableBody = document.getElementById("invoices-body");
    const addInvoiceBtn = document.getElementById("add-invoice-btn");
    let invoices = [];

    // استرجاع الفواتير المحفوظة عند تحميل الصفحة
    loadInvoices();

    // عرض الفواتير المحفوظة عند تحميل الصفحة
    function loadInvoices() {
        invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        invoices.forEach(invoice => {
            addInvoiceToTable(invoice);
        });
    }

    // حفظ الفاتورة في قائمة الفواتير وفي Local Storage
    function saveInvoice(invoice) {
        invoices.push(invoice);
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }

    // إضافة فاتورة إلى الجدول
    function addInvoiceToTable(invoice) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true">${invoice.sequence}</td>
            <td contenteditable="true">${invoice.name}</td>
            <td contenteditable="true">${invoice.amount}</td>
            <td contenteditable="true">${invoice.date}</td>
            <td contenteditable="true">${invoice.remaining}</td>
            <td><button class="edit-btn">تعديل</button></td>
        `;
        invoicesTableBody.appendChild(row);

        // إضافة حدث النقر على زر "تعديل"
        const editBtn = row.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            updateInvoice(row, invoice);
        });
    }

    // تحديث بيانات الفاتورة وحفظ التغييرات في Local Storage
    function updateInvoice(row, invoice) {
        const cells = row.querySelectorAll("td");
        invoice.sequence = cells[0].textContent;
        invoice.name = cells[1].textContent;
        invoice.amount = cells[2].textContent;
        invoice.date = cells[3].textContent;
        invoice.remaining = cells[4].textContent;
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }

    // إضافة حدث النقر على زر "إضافة الفاتورة"
    addInvoiceBtn.addEventListener("click", function() {
        // الحصول على قيم الحقول من النموذج
        const sequence = document.getElementById("sequence").value;
        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;
        const remaining = document.getElementById("remaining").value;

        // إنشاء كائن فاتورة
        const invoice = {
            sequence: sequence,
            name: name,
            amount: amount,
            date: date,
            remaining: remaining
        };

        // إضافة الفاتورة إلى الجدول وحفظها في Local Storage
        addInvoiceToTable(invoice);
        saveInvoice(invoice);

        // مسح محتوى حقول الإدخال بعد إضافة الفاتورة
        document.getElementById("sequence").value = "";
        document.getElementById("name").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";
        document.getElementById("remaining").value = "";
    });
});
