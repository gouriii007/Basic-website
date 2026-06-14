import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "data");
const dataFile = join(dataDir, "students.json");

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(dataFile, "[]", "utf8");
      return;
    }

    throw error;
  }
}

async function readLocalStudents() {
  await ensureDataFile();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw || "[]");

  return Array.isArray(parsed) ? parsed : [];
}

async function writeLocalStudents(students) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify(students, null, 2), "utf8");
}

export async function listStudents({ useMongo, studentModel }) {
  if (useMongo) {
    return studentModel.find();
  }

  return readLocalStudents();
}

export async function createStudent({ useMongo, studentModel, studentData }) {
  if (useMongo) {
    return studentModel.create(studentData);
  }

  const students = await readLocalStudents();
  const createdStudent = {
    _id: randomUUID(),
    ...studentData,
    sage: Number(studentData.sage),
  };

  students.push(createdStudent);
  await writeLocalStudents(students);

  return createdStudent;
}

export async function updateStudent({ useMongo, studentModel, id, studentData }) {
  if (useMongo) {
    return studentModel.findByIdAndUpdate(id, studentData, {
      new: true,
      runValidators: true,
    });
  }

  const students = await readLocalStudents();
  const index = students.findIndex((student) => student._id === id);

  if (index === -1) {
    return null;
  }

  students[index] = {
    ...students[index],
    ...studentData,
    sage: Number(studentData.sage),
  };

  await writeLocalStudents(students);

  return students[index];
}

export async function deleteStudent({ useMongo, studentModel, id }) {
  if (useMongo) {
    return studentModel.findByIdAndDelete(id);
  }

  const students = await readLocalStudents();
  const nextStudents = students.filter((student) => student._id !== id);

  if (nextStudents.length === students.length) {
    return null;
  }

  await writeLocalStudents(nextStudents);
  return true;
}