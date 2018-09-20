import java.util.ArrayList;
import java.util.Random;

public class QuadraticSpacePerfectHashing<AnyType> 
{
	static int p = 46337;

	int a, b;
	AnyType[] items;

	QuadraticSpacePerfectHashing()
	{
		a=b=0; items = null;
	}

	QuadraticSpacePerfectHashing(ArrayList<AnyType> array)
	{
		AllocateMemory(array);
	}

	public void SetArray(ArrayList<AnyType> array)
	{
		AllocateMemory(array);
	}

	public int Size()
	{
		if( items == null ) return 0;

		return items.length;
	}

	public boolean containsKey(int key)
	{
		// A completer

	}

	public boolean containsValue(AnyType x )
	{
		// A completer

	}

	public void remove (AnyType x) {
		// A completer

	}

	public int getKey (AnyType x) {
		// A completer
		
	}

	@SuppressWarnings("unchecked")
	private void AllocateMemory(ArrayList<AnyType> array)
	{
		Random generator = new Random( System.nanoTime() );

		if(array == null || array.size() == 0)
		{
			// A completer
			return;
		}
		if(array.size() == 1)
		{
			a = b = 0;

			// A completer			
			return;
		}

		// A completer

	}

	
	
	public String toString () {
		String result = "";
		
		// A completer
		
		
		return result; 
	}

	public void makeEmpty () {
		   // A completer
   	}
}
