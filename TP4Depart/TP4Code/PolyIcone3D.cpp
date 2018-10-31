

// Programme principal servant a executer les tests

#include "TP4_Test.h"

int main(int argc, char** argv)
{
	TP4_Test lesTests;

	if (lesTests.testComposite() == TP4_Test::SUCCES)
	{
		std::cout << "Patron Composite teste avec SUCCES" << std::endl << std::endl;
		if (lesTests.testDecorator() == TP4_Test::SUCCES)
		{
			std::cout << "Patron Decorator teste avec SUCCES" << std::endl;
		}
	}
}