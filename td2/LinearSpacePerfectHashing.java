import java.util.Random;
import java.util.ArrayList;

public class LinearSpacePerfectHashing<AnyType>
{
	static int p = 46337;

	QuadraticSpacePerfectHashing<AnyType>[] data;
	int a, b;

	LinearSpacePerfectHashing()
	{
		a=b=0; data = null;
	}

	LinearSpacePerfectHashing(ArrayList<AnyType> array)
	{
		AllocateMemory(array);
	}

	public void SetArray(ArrayList<AnyType> array)
	{
		AllocateMemory(array);
	}

	@SuppressWarnings("unchecked")
	private void AllocateMemory(ArrayList<AnyType> array)
	{
		Random generator = new Random( System.nanoTime() );

		if(array == null || array.size() == 0)
		{
			// A completer
			a = b = 0;
			data = null;
			return;
		}
		if(array.size() == 1)
		{
			a = b = 0;
			
			
			// A completer
			return;
		}
		a = generator.nextInt(p);
		b = generator.nextInt(p);
		data = new QuadraticSpacePerfectHashing[array.size()];

		for (int i = 0; i < array.size(); i++) {
			ArrayList<AnyType> hashList = new ArrayList<>();
			for (AnyType item : array) {
				if (getKey(item) == i) {
					hashList.add(item);
				}
			}
			data[i] = new QuadraticSpacePerfectHashing<AnyType>(hashList);
		}
		// A completer
	}

	public int Size()
	{
		if( data == null ) return 0;

		int size = 0;
		for(int i=0; i<data.length; ++i)
		{
			size += (data[i] == null ? 1 : data[i].Size());
		}
		return size;
	}

	public boolean containsKey(int key)
	{
		// A completer
		if (Size() != 0) {
			return data[key] != null;
		} else
			return false;
	}
	
	public int getKey (AnyType x) {
		// A completer
		if (Size() != 0) {
			return ((a * x.hashCode() + b) % p) % Size();
		} else
			return 0;
	}
	
	public boolean containsValue (AnyType x) {
		// A completer
		if (Size() == 0 || data[getKey(x)] == null)
			return false;
		return data[getKey(x)].equals(x);
	}
	
	public void remove (AnyType x) {
		// A completer
		if (Size() != 0) {
			int removeIndex = -1;
			for (int i = 0; i < data.length; i++) {
				if (data[i] == x) {
					removeIndex = i;
					break;
				}
			}

			for (int i = removeIndex; i < data.length - 1; i++) {
				data[i] = data[i + 1];
			}
		}
	}

	public String toString () {
		String result = "";
		// A completer
		for (int i = 0; i < data.length; i++) {
				result = result + "(clé_" + i + ", val_" + data[i].toString() + ") " + i + "\n";
		}
		return result; 
	}

	public void makeEmpty () {
		// A completer
		for (int i = 0; i > data.length; i++) {
			data[i] = null;
		}
   	}
	
}
