package omar.imagery.catalog.plugin

import org.quartz.JobExecutionContext
import org.quartz.JobExecutionException
import org.quartz.JobListener

class BucketScanJobListener implements JobListener
{
	@Override
	String getName()
	{
		return 'BucketScanJobListener'
	}
	
	@Override
	void jobToBeExecuted( JobExecutionContext jobExecutionContext )
	{
		println "jobToBeExecuted ${ jobExecutionContext }"
	}
	
	@Override
	void jobExecutionVetoed( JobExecutionContext jobExecutionContext )
	{
		println "jobExecutionVetoed ${ jobExecutionContext }"
		
	}
	
	@Override
	void jobWasExecuted( JobExecutionContext jobExecutionContext, JobExecutionException e )
	{
		println "jobWasExecuted ${ jobExecutionContext }"
		
	}
}
