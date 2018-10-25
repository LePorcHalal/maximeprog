import java.util.List;

public class BinaryNode<T extends Comparable<? super T>> {
	private T data;
	private BinaryNode<T> right;
	private BinaryNode<T> left;

	// TODO: initialisation
	// O(1)
	public BinaryNode(T data) {
		this.data = data;
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
		if (data == null)
			data = item;
		else {
			if (item.compareTo(data) > 0) {
				if (right == null)
					right = new BinaryNode<T>(item);
				else
					right.insert(item);
			} else {
				if (left == null)
					left = new BinaryNode<T>(item);
				else
					left.insert(item);
			}
		}
	}

	// TODO: est-ce que l'item fais partie du noeuds courant
	// O(log(n))
	public boolean contains(T item) {
		int difference = item.compareTo(data);
		if (difference == 0)
			return true;
		if (difference < 0 && left != null && left.contains(item))
			return true;
		if (difference > 0 && right != null && right.contains(item))
			return true;
		return false;
	}

	// TODO: on retourne la maximale de l'arbre
	// O(n)
	public int getHeight() {
		if (data == null)
			return -1;
		else {
			if (right != null && left != null)
				return 1 + Math.max(right.getHeight(), left.getHeight());
			else {
				if (right != null)
					return 1 + right.getHeight();
				else if (left != null)
					return 1 + left.getHeight();
				else
					return 0;
			}
		}
	}

	// TODO: l'ordre d'insertion dans la liste est l'ordre logique
	// de manière que le plus petit item sera le premier inseré
	// O(n)
	public void fillListInOrder(List<BinaryNode<T>> result) {
		if (left != null)
			left.fillListInOrder(result);
		result.add(this);
		if (right != null)
			right.fillListInOrder(result);
	}

}
