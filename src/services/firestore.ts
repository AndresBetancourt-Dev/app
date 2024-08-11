import { database } from "@/firebase";
import { Task } from "@/types";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  CollectionReference,
} from "firebase/firestore";

class FirestoreService {
  private collectionRef: (userId: string) => CollectionReference<Task>;

  constructor(collectionName: string) {
    this.collectionRef = (userId: string) =>
      collection(
        database,
        `${collectionName}/${userId}/tasks`
      ) as CollectionReference<Task>;
  }

  async createTask(userId: string, data: Task): Promise<string> {
    try {
      const collectionRef = this.collectionRef(userId);
      const docRef = await addDoc(collectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async getTask(userId: string, taskId: string): Promise<Task | null> {
    try {
      const docRef = doc(this.collectionRef(userId), taskId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Task;
      } else {
        console.log("Task not found.");
        return null;
      }
    } catch (error) {
      console.error("Error getting task:", error);
      throw error;
    }
  }

  async getAllTasks(userId: string): Promise<(Task & { id: string })[]> {
    try {
      const collectionRef = this.collectionRef(userId);
      console.log(collectionRef);
      const querySnapshot = await getDocs(collectionRef);
      const tasks: (Task & { id: string })[] = [];
      console.log(collectionRef);
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() } as Task & { id: string });
      });
      return tasks;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  }

  async updateTask(
    userId: string,
    taskId: string,
    data: Partial<Task>
  ): Promise<void> {
    try {
      const docRef = doc(this.collectionRef(userId), taskId);
      await updateDoc(docRef, data);
      console.log("Task updated.");
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      const docRef = doc(this.collectionRef(userId), taskId);
      await deleteDoc(docRef);
      console.log("Task deleted.");
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export default FirestoreService;
