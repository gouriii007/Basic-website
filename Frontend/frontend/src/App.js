import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Add from "./components/Add.tsx";
import View from "./components/View.tsx";

const emptyForm = {
  sname: "",
  sage: "",
  splace: "",
};

const apiPath = "/students";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiPath);
      if (!response.ok) {
        throw new Error("Failed to load students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      const payload = {
        ...formData,
        sage: Number(formData.sage),
      };

      const response = await fetch(editingId ? `${apiPath}/${editingId}` : apiPath, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(editingId ? "Could not update student" : "Could not save student");
      }

      resetForm();
      await loadStudents();
    } catch (submitError) {
      setError(submitError.message || "Something went wrong");
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      sname: student.sname || "",
      sage: String(student.sage || ""),
      splace: student.splace || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      const response = await fetch(`${apiPath}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete student");
      }

      if (editingId === id) {
        resetForm();
      }

      await loadStudents();
    } catch (deleteError) {
      setError(deleteError.message || "Something went wrong");
    }
  };

  return (
    <div className="app">
      <Navbar
        title="Student dashboard"
        subtitle="Manage student records from the MongoDB backend."
        total={students.length}
      />

      <main className="app-shell">
        {error ? <div className="error-banner">{error}</div> : null}
        <Add
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          editingId={editingId}
        />
        <View students={students} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      </main>
    </div>
  );
}

export default App;
