import java.util.ArrayList;
import java.util.Random;

public class QuadraticSpacePerfectHashing<AnyType> {
	static int p = 46337;

	int a, b;
	AnyType[] items;

	QuadraticSpacePerfectHashing() {
		a = b = 0;
		items = null;
	}

	QuadraticSpacePerfectHashing(ArrayList<AnyType> array) {
		AllocateMemory(array);
	}

	public void SetArray(ArrayList<AnyType> array) {
		AllocateMemory(array);
	}

	public int Size() {
		if (items == null)
			return 0;

		return items.length;
	}

	public boolean containsKey(int key) {
		if (Size() != 0) {
			return items[key] != null;
		} else
			return false;
		// A completer
	}

	public boolean containsValue(AnyType x) {
		if (Size() == 0 || items[getKey(x)] == null)
			return false;
		return items[getKey(x)].equals(x);
		// A completer
	}

	public void remove(AnyType x) {
		// A completer

		items[getKey(x)] = null;

	}

	public int getKey(AnyType x) {
		if (Size() != 0) {
			return ((a * x.hashCode() + b) % p) % Size();
		} else
			return 0;
	}

	public boolean collisionExist(ArrayList<AnyType> array) {
		for (AnyType item : array) {
			if (items[getKey(item)] != null) {
				return true;
			}
			items[getKey(item)] = item;
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	private void AllocateMemory(ArrayList<AnyType> array) {
		Random generator = new Random(System.nanoTime());
		if (array == null || array.size() == 0) {
			// A completer
			a = b = 0;
			items = null;
			return;
		}
		if (array.size() == 1) {
			a = b = 0;
			items = (AnyType[]) new Object[1];
			items[0] = array.get(0);
			// A completer
			return;
		}

		do {
			a = generator.nextInt(p - 1) + 1; // éviter les zéros
			b = generator.nextInt(p);
			int sizeM = array.size() * array.size();
			items = (AnyType[]) new Object[sizeM];
		} while (collisionExist(array));
	}

	public String toString() {
		String result = " ";
		// A completer
		if (Size() != 0) {
			for (AnyType i : items) {
				if (i != null)
					result = result + "(clé_" + String.valueOf(getKey(i)) + ", " + String.valueOf(i) + "),";
			}
		}
		result = result.substring(0, result.length() - 1);
		return result;
	}

	public void makeEmpty() {
		// A completer
		for (int i = 0; i > items.length; i++) {
			items[i] = null;
		}
	}
}
