

public class ArrayQueue<AnyType> implements Queue<AnyType>
{
	private int size = 0;		//Nombre d'elements dans la file.
	private int startindex = 0;	//Index du premier element de la file
	private AnyType[] table;
   
	@SuppressWarnings("unchecked")
	public ArrayQueue() 
	{
		//A completer
		table = (AnyType[]) new Object[1];
	}
	
	//Indique si la file est vide
	public boolean empty() 
	{ 
		return size == 0; 
	}
	
	//Retourne la taille de la file
	public int size() 
	{ 
		return size; 
	}
	
	//Retourne l'element en tete de file
	//Retourne null si la file est vide
	//complexité asymptotique: O(1)
	public AnyType peek()
	{
		//A completer
		if(empty() == true)
			return null;
		int end = size - 1;
		return table[end];
	}
	
	//Retire l'element en tete de file
	//complexité asymptotique: O(1)
	public void pop() throws EmptyQueueException
	{
		//A completer
		if(empty() == true) 
			throw new EmptyQueueException();
		int end = size - 1;
		table[end] = null;
		size = size - 1;
	}
	
	//Ajoute un element a la fin de la file
	//Double la taille de la file si necessaire (utiliser la fonction resize definie plus bas)
	//complexité asymptotique: O(1) ( O(N) lorsqu'un redimensionnement est necessaire )
	public void push(AnyType item)
	{
		//A completer
		if(size == table.length){
			resize(2);
		}
		table[size] = item;
		size = size + 1;
	}
   
	//Redimensionne la file. La capacite est multipliee par un facteur de resizeFactor.
	//Replace les elements de la file au debut du tableau
	//complexité asymptotique: O(N)
	@SuppressWarnings("unchecked")
	private void resize(int resizeFactor)
	{
		//A completer
			AnyType[] resize = table;
			if(size==0)
				table = (AnyType[]) new Object[1 * resizeFactor];
			else
				table = (AnyType[]) new Object[size * resizeFactor];
			for (int i = startindex; i < size; i++) {
				table[i] = resize[i];
			}
	}   
}

