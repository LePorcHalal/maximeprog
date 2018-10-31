import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class BinarySearchTree<T extends Comparable<? super T>> {

	private BinaryNode<T> root;

	public BinarySearchTree() {
	}

	// TODO: initialisation
	public BinarySearchTree(T item) {
		root = new BinaryNode<T>(item);
	}

	// TODO: on insere un nouvel item a partir de la racine
	// O(log(n))
	public void insert(T item) {
		root.insert(item);
	}

	// TODO: est-ce qu'un item fais partie de l'arbre
	// O(log(n))
	public boolean contains(T item) {
		return root.contains(item);
	}

	// TODO: trouver la hauteur de l'arbre
	// O(n)
	public int getHeight() {
		return root.getHeight();
	}

	// TODO: placer dans une liste les items de l'arbre en ordre
	// O(n)
	public List<BinaryNode<T>> getItemsInOrder() {
		List<BinaryNode<T>> list = new ArrayList<>();
		root.fillListInOrder(list);
		return list;
	}

	// TODO: retourner la liste d'item en String selon le bon format
	// O(n)
	public String toStringInOrder() {
		List<BinaryNode<T>> itemsInOrder = getItemsInOrder();
		StringBuilder list = new StringBuilder("[");
		for (int i = 0; i < itemsInOrder.size(); i++) {
			list.append(itemsInOrder.get(i).getData() + ", ");
		}
		return list.substring(0, list.length() - 2) + "]";
	}
}