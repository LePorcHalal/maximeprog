import java.util.Random;
import java.util.ArrayList;

public class LinearSpacePerfectHashing<AnyType> {
	static int p = 46337;

	QuadraticSpacePerfectHashing<AnyType>[] data;
	int a, b;

	LinearSpacePerfectHashing() {
		a = b = 0;
		data = null;
	}

	LinearSpacePerfectHashing(ArrayList<AnyType> array) {
		AllocateMemory(array);
	}

	public void SetArray(ArrayList<AnyType> array) {
		AllocateMemory(array);
	}

	@SuppressWarnings("unchecked")
	private void AllocateMemory(ArrayList<AnyType> array) {
		Random generator = new Random(System.nanoTime());

		if (array == null || array.size() == 0) {
			// A completer
			a = b = 0;
			data = null;
			return;
		}
		if (array.size() == 1) {
			a = b = 0;
			data = new QuadraticSpacePerfectHashing[1];
			data[0] = (QuadraticSpacePerfectHashing<AnyType>) array.get(0);
			// A completer
			return;
		}
		a = generator.nextInt(p);
		b = generator.nextInt(p);
		data = new QuadraticSpacePerfectHashing[array.size()];
		for (AnyType item : array) {
			int i = getKey(item);
			if (data[i] == null) {
				ArrayList<AnyType> arrayTemp = new ArrayList<AnyType>();
				arrayTemp.add(item);
				data[i] = new QuadraticSpacePerfectHashing<AnyType>(arrayTemp);
			} else {
				ArrayList<AnyType> arrayTemp = new ArrayList<AnyType>();
				for (AnyType items : data[i].items) {
					if (items != null)
						arrayTemp.add(items);
				}
				arrayTemp.add(item);
				data[i] = new QuadraticSpacePerfectHashing<AnyType>(arrayTemp);
			}
		}
		// A completer
	}

	public int Size() {
		if (data == null)
			return 0;

		int size = 0;
		for (int i = 0; i < data.length; ++i) {
			size += (data[i] == null ? 1 : data[i].Size());
		}
		return size;
	}

	public boolean containsKey(int key) {
		// A completer
		return (data[key] == null ? false : true);
	}

	public int getKey(AnyType x) {
		// A completer
		if (Size() != 0) {
			return (((a * x.hashCode() + b) % p) % (data.length));
		} else
			return 0;
	}

	public boolean containsValue(AnyType x) {
		// A completer
		if (Size() == 0 || data[getKey(x)] == null)
			return false;
		return data[getKey(x)].containsValue(x);
	}

	public void remove(AnyType x) {
		// A completer
		int key = getKey(x);
		if (containsValue(x))
			data[key].remove(x);
	}

	public String toString() {
		String result = "";
		// A completer
		for (int i = 0; i < data.length; i++) {
			if (data[i] != null)
				result += "[clé_" + String.valueOf(i) + "] " + "->" + data[i].toString() + "\n";
		}
		return result;
	}

	public void makeEmpty() {
		// A completer
		for (int i = 0; i > data.length; i++) {
			data[i].makeEmpty();
		}
	}

}
