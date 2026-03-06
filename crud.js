const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("node:fs/promises");
const path = require("node:path");

const lokasiFile = path.join(__dirname, "data.json");
const rl = readline.createInterface({ input, output });

async function bacaData() {
    try {
        const isiFile = await fs.readFile(lokasiFile, "utf-8");
        return JSON.parse(isiFile);
    } catch (error) {
        return [];
    }
}

async function simpanData(data) {
    await fs.writeFile(lokasiFile, JSON.stringify(data, null, 2));
}

async function lihatData() {
    const data = await bacaData();
   
    if (data.length === 0) {
        console.log("Data masih kosong.");
    } else {
        data.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
}

async function tambahData() {
    const inputData = await rl.question("Masukkan data baru: ");
    const data = await bacaData();
    
    data.push(inputData);
    await simpanData(data);
    
    console.log(`Berhasil menambahkan data: ${inputData}`);
}

async function ubahData() {
    await lihatData();
    const data = await bacaData();
    
    if (data.length === 0) return;

    const nomorInput = await rl.question("Pilih nomor data yang ingin diubah: ");
    const indeks = parseInt(nomorInput) - 1;

    if (indeks >= 0 && indeks < data.length) {
        const dataBaru = await rl.question("Masukkan data pengganti: ");
        data[indeks] = dataBaru;
        
        await simpanData(data);
        console.log("Data berhasil diubah.");
    } else {
        console.log("Nomor data tidak ditemukan.");
    }
}

async function hapusData() {
    await lihatData();
    const data = await bacaData();
    
    if (data.length === 0) return;

    const nomorInput = await rl.question("Pilih nomor data yang ingin dihapus: ");
    const indeks = parseInt(nomorInput) - 1;

    if (indeks >= 0 && indeks < data.length) {
        const dataTerhapus = data.splice(indeks, 1);
        
        await simpanData(data);
        console.log(`Berhasil menghapus data: ${dataTerhapus}`);
    } else {
        console.log("Nomor data tidak ditemukan.");
    }
}

async function menuUtama() {
    let aplikasiBerjalan = true;
    
    while (aplikasiBerjalan) {
        console.log("\n--- MENU CRUD ---");
        console.log("1. Lihat Data");
        console.log("2. Tambah Data");
        console.log("3. Ubah Data");
        console.log("4. Hapus Data");
        console.log("5. Keluar");
        
        const pilihan = await rl.question("Pilih menu (1-5): ");
        
        try {
            if (pilihan === "1") await lihatData();
            else if (pilihan === "2") await tambahData();
            else if (pilihan === "3") await ubahData();
            else if (pilihan === "4") await hapusData();
            else if (pilihan === "5") {
                console.log("Keluar dari program.");
                aplikasiBerjalan = false;
            } else {
                console.log("Pilihan tidak valid.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    }
    rl.close();
}

menuUtama();
