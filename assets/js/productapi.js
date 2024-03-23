let url = "https://crudcrud.com/api/a7876c30bb264692bcac299a2864488c/users";
// Read Data
function getData() {
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            let dataProduct = document.getElementById("dataProduct");
            let nomor = 1;
            dataProduct.innerHTML = "";
            res.forEach((element) => {
                dataProduct.innerHTML += ` <tr>
                                                <td class="no-tabel">${nomor}</td>
                                                <td>${element.nama_produk}</td>
                                                <td>${element.jumlah}</td>
                                                <td>${element.harga}</td>
                                                <td>
                                                    <div class="" style="display:flex;gap:10px">
                                                        <a href="#" class="update-data btn-daftar" data-produkid="${element._id}" style="text-decoration:none">Update</a>
                                                        <a href="#" class="delete-data btn-reset" data-produkid="${element._id}" style="text-decoration:none">Delete</a>
                                                    </div>
                                                </td>
                                            </tr>`;
                nomor++;
            });

            // Add event listeners for update and delete buttons
            document.querySelectorAll('.update-data').forEach(item => {
                item.addEventListener('click', updateData);
            });

            document.querySelectorAll('.delete-data').forEach(item => {
                item.addEventListener('click', deleteData);
            });
        });
}

// Update Data
function updateData(event) {
    event.preventDefault();
    const productId = event.target.getAttribute('data-produkid');
    // Implement your update logic here, for example: open a modal with form to update the data
    console.log('Update data with id:', productId);
}

// Delete Data
function deleteData(event) {
    event.preventDefault();
    const productId = event.target.getAttribute('data-produkid');
    // Confirm with the user before deleting the data
    if (confirm("Are you sure you want to delete this product?")) {
        fetch(`${url}/${productId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete the product.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product deleted:', data);
                // Refresh data after deletion
                getData();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                // Handle error
            });
    }
}


// Create Data
document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const nama_produk = document.getElementById("nama_produk").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const harga = parseInt(document.getElementById("harga").value);

    const produk_baru = {
        nama_produk: nama_produk,
        jumlah: jumlah,
        harga: harga,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produk_baru),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data produk baru berhasil ditambahkan:", data);
            getData();
        });
});

getData();
