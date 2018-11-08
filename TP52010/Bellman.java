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
	private List<Vector<Double>> piTable =  new ArrayList<Vector<Double>>();
	private List<Vector<Integer>> rTable =  new ArrayList<Vector<Integer>>();
	
	public Bellman (Graph g) {
		this.graph = g;
	}
	
	public void setSourceNode(Node source) {
		this.sourceNode = source;
	}
	
	public void shortestPath() {
		// Compl�ter
		
		

	}
	
	public void  diplayShortestPaths() {
		//Compl�ter
	}

	public void displayTables() {
	 //Compl�ter

	System.out.println("<<PITable>>:");
		for(int i = 0; i<graph.getNodes().size(); i++){

		}
	}
}
