import java.util.List;

public class BinaryNode<T extends Comparable<? super T> > {
    private T data;
    private BinaryNode<T> right;
    private BinaryNode<T> left;

    // TODO: initialisation
    // O(1)
    public BinaryNode(T data) {
    	data = null;
    	right = null;
    	left = null;
    }

    // TODO: on retourne la donnee voulue
    // O(1)
    public T getData() {
        return data;
    }

    // TODO: on ajoute une nouvelle donnee au bon endroit
    // O(log(n))
    public void insert(T item) {
    	if(data.compareTo(item) <= 0) {
    		
    	}
    }

    // TODO: est-ce que l'item fais partie du noeuds courant
    // O(log(n))
    public boolean contains(T item) {
    	
    	if(data.compareTo(item)== 0) {
    		return true;
    	}
    	
    	if(data.compareTo(item) < 0) {
    		if(left.getData()==null) {
    			return false;
    			
    		}
    		data = left.getData(); 
    		contains(item);
    	}else {
    		if(right.getData()==null) {
    			return false;
    		}
    		data = right.getData(); 
    		contains(item);
    	}
        return false;
    }

    // TODO: on retourne la maximale de l'arbre
    // O(n)
    public int getHeight() {
    	if( data == null )
    		return -1;
    	else
    		return 1 + Math.max(left.getHeight(),right.getHeight());
    }

    // TODO: l'ordre d'insertion dans la liste est l'ordre logique
    // de manière que le plus petit item sera le premier inseré
    // O(n)
    public void fillListInOrder(List<BinaryNode<T>> result) {

    }
}
