import java.util.ArrayList;
import java.util.Random;

public class HashFunctions {
	static int p = 46337;

	public static void main(String[] args) {
		// Donnees brutes
		Integer[] array = { 100, 75, 64, 25, 36, 101, 11, 92, 200, 175, 164, 125, 136, 201, 111, 192, 300, 275, 264,
				225, 236, 301, 311, 292 };

		// Les donnees sont inserees dans un ArrayList
		ArrayList<Integer> al = new ArrayList<Integer>(array.length);

		for (Integer item : array)
			al.add(item);

		/**
		 * Exercice 2
		 */
		// On cree un QuadraticSpacePerfectHashing et insere les donnees
		System.out.println("QuadraticSpacePerfectHashing:");
		System.out.println();

		QuadraticSpacePerfectHashing<Integer> e = new QuadraticSpacePerfectHashing<Integer>(al);
		// Verifie les proprietes d'occupation d'espace
		System.out.println("Number of elements: " + al.size());
		System.out.println("Size: " + e.Size());
		System.out.println();
		// Verifie qu'il fonctionne comme prevu
		System.out.println(100 + " est pr�sent: " + e.containsValue(100));
		System.out.println(99 + " est pr�sent: " + e.containsValue(99));
		System.out.println(200 + " est pr�sent: " + e.containsValue(200));
		System.out.println(199 + " est pr�sent: " + e.containsValue(199));
		System.out.println(300 + " est pr�sent: " + e.containsValue(300));
		System.out.println(299 + " est pr�sent: " + e.containsValue(299));
		System.out.println();

		System.out.println(
				"La cl� de 100 est : " + e.getKey(100) + ", elle est pr�sente: " + e.containsKey(e.getKey(100)));
		System.out
				.println("La cl� de 99 est : " + e.getKey(99) + ", elle est pr�sente: " + e.containsKey(e.getKey(99)));
		System.out.println(
				"La cl� de 200 est : " + e.getKey(200) + ", elle est pr�sente: " + e.containsKey(e.getKey(200)));
		System.out.println(
				"La cl� de 199 est : " + e.getKey(199) + ", elle est pr�sente: " + e.containsKey(e.getKey(199)));
		System.out.println(
				"La cl� de 300 est : " + e.getKey(300) + ", elle est pr�sente: " + e.containsKey(e.getKey(300)));
		System.out.println(
				"La cl� de 299 est : " + e.getKey(299) + ", elle est pr�sente: " + e.containsKey(e.getKey(299)));
		System.out.println();

		System.out.println(e);

		System.out.println();

		/**
		 * Exercice 3
		 */
		// On cree un LinearSpacePerfectHashing et insere les memes donnees
		System.out.println("LinearSpacePerfectHashing:");
		System.out.println();

		LinearSpacePerfectHashing<Integer> pfhash = new LinearSpacePerfectHashing<Integer>(al);

		// Verifie les proprietes d'occupation d'espace
		System.out.println("Number of elements: " + al.size());
		System.out.println("Size: " + pfhash.Size());
		System.out.println();

		// Verifie qu'il fonctionne comme prevu
		System.out.println(100 + " est present: " + pfhash.containsValue(100));
		System.out.println(99 + " est present: " + pfhash.containsValue(99));
		System.out.println(200 + " est present: " + pfhash.containsValue(200));
		System.out.println(199 + " est present: " + pfhash.containsValue(199));
		System.out.println(300 + " est present: " + pfhash.containsValue(300));
		System.out.println(299 + " est present: " + pfhash.containsValue(299));
		System.out.println();

		System.out.println("La cl� de 100 est : " + pfhash.getKey(100) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(100)));
		System.out.println("La cl� de 99 est : " + pfhash.getKey(99) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(99)));
		System.out.println("La cl� de 200 est : " + pfhash.getKey(200) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(200)));
		System.out.println("La cl� de 199 est : " + pfhash.getKey(199) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(199)));
		System.out.println("La cl� de 300 est : " + pfhash.getKey(300) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(300)));
		System.out.println("La cl� de 299 est : " + pfhash.getKey(299) + ", elle est pr�sente: "
				+ pfhash.containsKey(pfhash.getKey(299)));
		System.out.println();

		System.out.println(pfhash);
		System.out.println();

		/**
		 * Confirmation des resultats de Exercice 3
		 */
		// Effectues quelques tests aleatoires pour verifier les proprietes de taille
		pfhash = new LinearSpacePerfectHashing<Integer>();

		for (int i = 0, nbElements = 10; i < 40; ++i, nbElements += 10) {
			pfhash.SetArray(randomIntegers(nbElements));
			System.out.println(nbElements + "\t" + pfhash.Size());
		}
	}

	/**
	 * Question 1
	 */
	public static ArrayList<Integer> randomIntegers(int length) {
		Random generator = new Random(System.nanoTime());
		int a = 0;
		ArrayList<Integer> array = new ArrayList<>(length);
		for (int i = 0; i < length; i++) {
			do {
				a = generator.nextInt(p);
			} while (array.contains(a));
			array.add(a);
		}
		return array;

	}
}
