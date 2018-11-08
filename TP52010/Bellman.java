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
		// Compl�ters
		int v = graph.getNodes().size();
		int e = graph.getEdges().size();
		Double distance[] = new Double[graph.getNodes().size()];
		Double predecessor[] = new Double[graph.getEdges().size()];
		
		for(int i = 0; i<graph.getNodes().size(); i++){
			distance[i] = graph.inf;
		}

		/*for(int i = 0; i<graph.getNodes().size(); i++){
			if(graph.getNodes().get(i).equals(sourceNode)){
				int src = i;
				break;
			}
		}*/
		distance[sourceNode.getId()]=0.0;

		for(int i = 1; i<v; ++i){
			for(int j = 0; j<e; ++j){
				int srcID = graph.getEdges().get(j).getSource().getId();
				int destID = graph.getEdges().get(j).getDestination().getId();
				Double dist = graph.getEdges().get(j).getDistance();
				if(distance[srcID]!=graph.inf && distance[srcID]+dist < distance[destID]){
					distance[destID]=distance[srcID]+dist;
				}
			}
		}
		
		for(int k = 0; k<distance.length; k++){
			System.out.println(distance[k]);
		}
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
