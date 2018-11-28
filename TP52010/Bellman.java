import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.Vector;

public class Bellman {
	private Graph graph;
	private Node sourceNode;
	private List<Vector<Double>> piTable = new ArrayList<Vector<Double>>();
	private List<Vector<Integer>> rTable = new ArrayList<Vector<Integer>>();

	public Bellman(Graph g) {
		this.graph = g;
	}

	public void setSourceNode(Node source) {
		this.sourceNode = source;
	}

	public void shortestPath() {

		int iteration = 1;
		List<Edge> listeEdgesAVisiter = new ArrayList<Edge>();
		listeEdgesAVisiter = graph.getOutEdges(sourceNode);
		int v = graph.getNodes().size();
		piTable.clear();
		Vector<Double> vecTemp = new Vector<Double>();
		Vector<Integer> vecTempRTable = new Vector<Integer>();

		for (int i = 0; i < v; i++) {
			vecTempRTable.add(null);
		}

		for (int i = 0; i < v; i++) {
			vecTemp.add(Graph.inf);
		}

		vecTemp.set(sourceNode.getId(), 0.0);

		piTable.add(vecTemp);
		rTable.add(vecTempRTable);

		while (iteration <= v) {

			vecTemp = (Vector) piTable.get(iteration - 1).clone();
			vecTempRTable = (Vector) rTable.get(iteration - 1).clone();
			List<Edge> prochaineListeAVisiter = new ArrayList<Edge>();

			for (Edge edge : listeEdgesAVisiter) {
				int srcID = edge.getSource().getId();
				int destID = edge.getDestination().getId();
				Double dist = edge.getDistance();

				if (vecTemp.get(srcID) + dist < vecTemp.get(destID)) {
					vecTemp.set(destID, vecTemp.get(srcID) + dist);
					vecTempRTable.set(destID, srcID);
					prochaineListeAVisiter.addAll(graph.getOutEdges(edge.getDestination()));
				}

			}

			listeEdgesAVisiter = prochaineListeAVisiter;
			piTable.add(vecTemp);
			rTable.add(vecTempRTable);
			if (piTable.get(iteration - 1).equals(piTable.get(iteration))) {
				break;
			}
			iteration++;

		}
	}

	public void diplayShortestPaths() {
		// Compl�ter
	}

	public void displayTables() {
		// Compl�ter

		int iteration = 0;
		System.out.println("<< PITable >>:");
		System.out.print("		");
		for (int i = 0; i < graph.getNodes().size(); i++)
			System.out.print(graph.getNodes().get(i).getName() + "	");
		while (iteration < piTable.size()) {
			System.out.println();
			System.out.print(iteration + "	:	");
			for (int i = 0; i < graph.getNodes().size(); i++) {
				if (piTable.get(iteration).get(i) == Graph.inf)
					System.out.print("inf	");
				else
					System.out.print(piTable.get(iteration).get(i) + "	");
			}
			iteration++;
		}

		System.out.println("\n");
		iteration = 0;

		System.out.println("<< RTable >>:");
		System.out.print("k	: 	");
		for (int i = 0; i < graph.getNodes().size(); i++)
			System.out.print(graph.getNodes().get(i).getName() + "	");
		while (iteration < rTable.size()) {
			System.out.println();
			System.out.print(iteration + "	:");
			for (int i = 0; i < rTable.get(iteration).size(); i++) {
				if (rTable.get(iteration).get(i) != null)
					System.out.print("	" + graph.getNodes().get(rTable.get(iteration).get(i)).getName());
				else
					System.out.print("	-");
			}
			iteration++;
		}
		System.out.println("\n");
	}
}
