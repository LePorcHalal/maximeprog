import java.util.*;

public class Main {
	/**
	 * Fonction principale
	 */
	public static void main(String[] args) {
		// creer un monceau avec 22 elements et un tableau equivalent
		int numItems = 22;
		BinaryHeap<Integer> heap = new BinaryHeap<Integer>(true);

		Integer[] items = new Integer[numItems];

		int i;
		int j;

		// en inserant les elements un a un
		for (i = 11, j = 0; j != numItems; i = (i + 37), j++) {
			heap.offer(i);
			items[j] = i;

			i %= numItems;
		}

		// en construisant le monceau depuis le depart
		System.out.println("Monceau min contruit element par element:");
		System.out.println(heap.printFancyTree());

		heap = new BinaryHeap<Integer>(false);
		// en inserant les elements un a un
		for (Integer item : items)
			heap.offer(item);

		// en construisant le monceau depuis le depart
		System.out.println("Monceau max contruit element par element:");
		System.out.println(heap.printFancyTree());

		heap = new BinaryHeap<Integer>(items, false);
		System.out.println("Monceau max contruit a partir d'un tableau:");
		System.out.println(heap.printFancyTree());

		heap = new BinaryHeap<Integer>(items, true);
		System.out.println("Monceau min contruit a partir d'un tableau:");
		System.out.println(heap.printFancyTree());

		System.out.println();
		System.out.println("Affichage recursif:");
		System.out.println(heap.printFancyTree());

		System.out.println("Affichage non recursif:");
		System.out.println(heap.nonRecursivePrintFancyTree());

		System.out.println();
		System.out.println("Tableau d'origine:");
		System.out.println(printArray(items));

		BinaryHeap.heapSort(items);
		System.out.println("Tableau ordonne:");
		System.out.println(printArray(items));

		BinaryHeap.heapSortReverse(items);
		System.out.println("Tableau inversement ordonne:");
		System.out.println(printArray(items));

		/*
		 * Ajouter appels pour repondre a la question
		 **/

		// Tests du poll par rapport à une priority queue
		PriorityQueue<Integer> test = new PriorityQueue<Integer>();
		for (Integer item : items)
			test.offer(item);
		Boolean pollCorrect = true;
		for (int k = 0; k < 22; k++) {
			if (heap.poll() != test.poll()) {
				pollCorrect = false;
			}
		}
		System.out.println("\n" + "Poll pareil que le poll d'une priority queue: " + pollCorrect);

		// Affichage de différents poll sur un min heap
		heap = new BinaryHeap<Integer>(true);
		for (Integer item : items)
			heap.offer(item);
		System.out.println("\n" + "Poll sur un min heap avec le tableau ordonné");
		heap.poll();
		System.out.println("Affichage après 1 poll:");
		System.out.println(heap.printFancyTree());
		for (int k = 0; k < 21; k++)
			heap.poll();
		System.out.println("Affichage après 22 poll:");
		System.out.println(heap.printFancyTree());

		// Affichage de différents poll sur un max heap
		System.out.println("Poll sur un max heap avec le tableau ordonné");
		heap = new BinaryHeap<Integer>(false);
		for (Integer item : items)
			heap.offer(item);
		heap.poll();
		System.out.println("Affichage après 1 poll:");
		System.out.println(heap.printFancyTree());
		for (int k = 0; k < 22; k++)
			heap.poll();
		System.out.println("Affichage après 22 poll:");
		System.out.println(heap.printFancyTree());

		// Différents tests sur les itérators
		System.out.println("Heap pour les tests iterator:");
		heap = new BinaryHeap<Integer>(false);
		for (Integer item : items)
			heap.offer(item);
		System.out.println(heap.printFancyTree());
		Iterator<Integer> iterator = heap.iterator();
		String contenu = "";
		Boolean fin = false;
		System.out.println("Iterator next() jusqu'à la fin du heap:" + "\n");
		System.out.println("Iterator hasNext() sur la première case (devrait être true): " + iterator.hasNext());
		do {
			try {
				contenu += " " + iterator.next();
			} catch (NoSuchElementException e) {
				System.out.println("Fin de la boucle infinie, car on est à la fin du heap: " + e);
				System.out.println("Tableau complet avec next(): " + contenu);
				fin = true;
			}
		} while (fin == false);
		System.out.println("Iterator hasNext() sur la dernière case (devrait être false): " + iterator.hasNext());

		System.out.println("\n" + "Ajout d'un int dans le heap en cours d'itération:" + "\n");
		heap.offer(1);
		try {
			iterator.next();
		} catch (ConcurrentModificationException e) {
			System.out.println("La modification a été trouvée -> fail-fast: " + e);
		}
	}

	private static <AnyType> String printArray(AnyType[] a) {
		String outputString = "";

		for (AnyType item : a) {
			outputString += item;
			outputString += ", ";
		}

		return outputString.substring(0, outputString.length() - 2);
	}
}
