"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ExcelJS from "exceljs";
import { db } from "../firebaseConfig";
import { collection, getDocs, setDoc, doc, writeBatch } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

const ImportPage = ({ userId }) => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading");
      return;
    }

    const extension = file.name.split(".").pop();

    setLoading(true);

    let parsedData = [];

    if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          parsedData = results.data;
          await processNumbers(parsedData);
        },
      });
    } else if (extension === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.worksheets[0];
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        parsedData.push({
          name: row.getCell(2).value,
          phone: row.getCell(1).value,
        });
      });
      await processNumbers(parsedData);
    } else {
      alert("Unsupported file format");
      setLoading(false);
    }
  };

  const processNumbers = async (parsedData) => {
    const validNumbers = [];
    const numbersCollection = collection(db, `users/${userId}/phoneNumbers`);
    const existingNumbersSnapshot = await getDocs(numbersCollection);
    const existingNumbers = existingNumbersSnapshot.docs.map(doc => doc.data().phone);

    let userCounter = 1;

    for (let data of parsedData) {
      let phone = data.phone;
      let name = data.name;

      if (!phone && name) {
        phone = name;
      }

      if (phone) {
        phone = String(phone).trim();

        if (!name || /^[\d\s]+$/.test(name)) {
          name = `user ${userCounter++}`;
        }

        console.log("Processing phone:", phone);

        if (/^\+?\d{10,15}$/.test(phone) && !existingNumbers.includes(phone)) {
          validNumbers.push({ name, phone, dateAdded: new Date() });
        }
      }
    }

    console.log("Valid Numbers:", validNumbers);

    const batch = writeBatch(db);
    validNumbers.forEach(number => {
      const numberDoc = doc(db, `users/${userId}/phoneNumbers`, number.phone);
      batch.set(numberDoc, number);
    });
    await batch.commit();

    setLoading(false);
    setIsModalOpen(false);
    fetchNumbers();
  };

  const fetchNumbers = async () => {
    const numbersCollection = collection(db, `users/${userId}/phoneNumbers`);
    const numbersSnapshot = await getDocs(numbersCollection);
    const numbersList = numbersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        dateAdded: data.dateAdded.toDate().toISOString().split('T')[0],
      };
    });
    setNumbers(numbersList);
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  const filteredNumbers = numbers.filter(number => {
    const matchesSearchTerm = number.name.toLowerCase().includes(searchTerm.toLowerCase()) || number.phone.includes(searchTerm);
    const matchesDateFilter = !dateFilter || number.dateAdded === dateFilter;
    return matchesSearchTerm && matchesDateFilter;
  });

  const paginatedNumbers = filteredNumbers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedNumbers(new Set(paginatedNumbers.map(number => number.phone)));
    } else {
      setSelectedNumbers(new Set());
    }
  };

  const handleSelect = (phone) => {
    setSelectedNumbers(prev => {
      const updated = new Set(prev);
      if (updated.has(phone)) {
        updated.delete(phone);
      } else {
        updated.add(phone);
      }
      return updated;
    });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const batch = writeBatch(db);
    selectedNumbers.forEach(phone => {
      const numberDoc = doc(db, `users/${userId}/phoneNumbers`, phone);
      batch.delete(numberDoc);
    });
    await batch.commit();
    setIsDeleteModalOpen(false);
    setSelectedNumbers(new Set());
    fetchNumbers();
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) {
      alert("Please provide both name and phone number.");
      return;
    }

    const numberDoc = doc(db, `users/${userId}/phoneNumbers`, newContact.phone);
    await setDoc(numberDoc, { ...newContact, dateAdded: new Date() });

    setIsAddContactModalOpen(false);
    setNewContact({ name: "", phone: "" });
    fetchNumbers();
  };

  const totalNumbers = filteredNumbers.length;

  const handleNextPage = () => {
    if ((currentPage * rowsPerPage) < totalNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:25}}>Import Phone Numbers</h1>

      <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
        {/* Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
          style={{fontFamily: "LeagueSpartan, sans-serif"}}
        >
          Upload
        </button>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
          style={{fontFamily: "LeagueSpartan, sans-serif"}}
        />

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/3 mb-4 md:mb-0"
        />
        
        {/* Add Contact Button */}
        <button
          onClick={() => setIsAddContactModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-green-600 transition duration-300"
          style={{fontFamily: "LeagueSpartan, sans-serif"}}
        >
          Add Contact
        </button>

        {/* Delete Selected Button */}
        {selectedNumbers.size > 0 && (
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
            style={{fontFamily: "LeagueSpartan, sans-serif"}}
          >
            <MdDelete className="inline mr-2" /> Delete Selected
          </button>
        )}
      </div>

      {/* Modal for File Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 max-w-md">
            <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Upload Phone Numbers</h2>
            <input
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            {loading && <p>Loading...</p>}
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-gray-400 transition duration-300 mr-2"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 max-w-md">
            <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Confirm Delete</h2>
            <p>Are you sure you want to delete the selected numbers?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-gray-400 transition duration-300 mr-2"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 max-w-md">
            <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Add Contact</h2>
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddContactModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-gray-400 transition duration-300 mr-2"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="bg-green-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-green-600 transition duration-300"
                style={{fontFamily: "LeagueSpartan, sans-serif"}}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table with Phone Numbers */}
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={paginatedNumbers.length > 0 && selectedNumbers.size === paginatedNumbers.length}
              />
            </th>
            <th className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Name</th>
            <th className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Phone ({totalNumbers})
            </th>
            <th className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNumbers.map((number) => (
            <tr key={number.phone} className="hover:bg-gray-100" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              <td className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
                <input
                  type="checkbox"
                  checked={selectedNumbers.has(number.phone)}
                  onChange={() => handleSelect(number.phone)}
                  style={{fontFamily: "LeagueSpartan, sans-serif"}}
                />
              </td>
              <td className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{number.name}</td>
              <td className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{number.phone}</td>
              <td className="border border-gray-300 p-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{number.dateAdded}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-gray-400 transition duration-300"
          style={{fontFamily: "LeagueSpartan, sans-serif"}}
        >
          Previous
        </button>
        <span className="self-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage * rowsPerPage) >= totalNumbers}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-gray-400 transition duration-300"
          style={{fontFamily: "LeagueSpartan, sans-serif"}}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImportPage;

