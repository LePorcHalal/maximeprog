import java.util.ArrayList;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

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
		return items[key] != null;
		

	}

	public boolean containsValue(AnyType x )
	{
		
		for(int i = 0; i < items.length; i++) {
			if(items[i] == x)
				return true;
		}
		return false;
		// A completer

	}

	public void remove (AnyType x) {
		// A completer
		int removeIndex = -1;
		for(int i = 0; i < items.length; i++) {
			if(items[i] == x) {
			 removeIndex = i;
				break;
			}
		}

		   for(int i = removeIndex; i < items.length -1; i++){
		        items[i] = items[i + 1];
		      }	

	}

	public int getKey (AnyType x) {
		
		return ((a*items.hashCode() + b)%p)%Size();	
	}
	public boolean collisionExist() {
		
		return true;
	}

	@SuppressWarnings("unchecked")
	private void AllocateMemory(ArrayList<AnyType> array)
	{
		Random generator = new Random( System.nanoTime() );
		a = generator.nextInt(p);
		b = generator.nextInt(p);
		int sizeM = array.size() * array.size();
		
		while(collisionExist());
		
		 items = (AnyType[]) new Object[sizeM];
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
		
		int postion = ((a*items.hashCode() + b)%p)%sizeM;
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
