const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("node:fs/promises");
const path = require("node:path");

const lokasiFile = path.join(__dirname, "data.json");
const rl = readline.createInterface({ input, output });

async function mulaiAplikasi() {
    try {
        console.log("\n=== MENU CRUD ===");
        console.log("1. Lihat Data");
        console.log("2. Tambah Data");
        console.log("3. Ubah Data");
        console.log("4. Hapus Data");
        console.log("5. Keluar");

        let pilihan = await rl.question("Pilih menu: ");

        if (pilihan === "1") {
            let isiMentah = await fs.readFile(lokasiFile, "utf-8");
            let dataArray = JSON.parse(isiMentah);
            
            console.log("Data saat ini:");
            for (let i = 0; i < dataArray.length; i++) {
                console.log((i + 1) + ". " + dataArray[i]);
            }
            
            mulaiAplikasi();

        } else if (pilihan === "2") {
            let dataBaru = await rl.question("Masukkan data: ");
            
            let isiMentah = await fs.readFile(lokasiFile, "utf-8");
            let dataArray = JSON.parse(isiMentah);
            
            dataArray.push(dataBaru);
            
            // Perhatikan bagian ini: null, 2 membuat JSON rapi ke bawah
            await fs.writeFile(lokasiFile, JSON.stringify(dataArray, null, 2));
            console.log("Data berhasil ditambah!");
            
            mulaiAplikasi();

        } else if (pilihan === "3") {
            let isiMentah = await fs.readFile(lokasiFile, "utf-8");
            let dataArray = JSON.parse(isiMentah);
            
            console.log("Data saat ini:");
            for (let i = 0; i < dataArray.length; i++) {
                console.log((i + 1) + ". " + dataArray[i]);
            }

            let nomor = await rl.question("Pilih nomor yang mau diubah: ");
            let index = Number(nomor) - 1;

            let dataUbah = await rl.question("Masukkan data baru: ");
            dataArray[index] = dataUbah;

            // Perhatikan bagian ini juga: null, 2
            await fs.writeFile(lokasiFile, JSON.stringify(dataArray, null, 2));
            console.log("Data berhasil diubah!");

            mulaiAplikasi();

        } else if (pilihan === "4") {
            let isiMentah = await fs.readFile(lokasiFile, "utf-8");
            let dataArray = JSON.parse(isiMentah);
            
            console.log("Data saat ini:");
            for (let i = 0; i < dataArray.length; i++) {
                console.log((i + 1) + ". " + dataArray[i]);
            }

            let nomor = await rl.question("Pilih nomor yang mau dihapus: ");
            let index = Number(nomor) - 1;

            dataArray.splice(index, 1);

            // Perhatikan bagian ini juga: null, 2
            await fs.writeFile(lokasiFile, JSON.stringify(dataArray, null, 2));
            console.log("Data berhasil dihapus!");

            mulaiAplikasi();

        } else if (pilihan === "5") {
            console.log("Program selesai.");
            rl.close();
        } else {
            console.log("Menu salah.");
            mulaiAplikasi();
        }

    } catch (error) {
        console.log("Data belum ada atau terjadi error. Sistem membuat file baru...");
        await fs.writeFile(lokasiFile, "[]"); 
        mulaiAplikasi();
    }
}

mulaiAplikasi();